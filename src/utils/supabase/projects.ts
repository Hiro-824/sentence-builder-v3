import { createClient } from "@/utils/supabase/client";
import { Project } from "@/models/project";
import { Block } from "@/models/block";

export async function listProjects(): Promise<Project[]> {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log("listProjects: User not authenticated. Returning empty array.");
        return [];
    }

    try {
        const { data: files, error } = await supabase.storage
            .from('projects')
            .list(user.id, {
                sortBy: { column: 'updated_at', order: 'desc' },
            });

        if (error) {
            throw error;
        }

        if (!files) {
            return [];
        }

        // Map the file metadata from Supabase Storage to our Project type.
        const projects: Project[] = files
            .filter(file => file.name.endsWith('.json')) // Ensure we only process project files
            .map(file => ({
                id: file.name.replace('.json', ''),
                name: file.name.replace('.json', ''), // The file name is the title
                updated_at: file.updated_at,
            }));

        return projects;
    } catch (error) {
        console.error("Error listing projects:", error);
        return [];
    }
}

export async function getProjectData(projectId: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    const filePath = `${user.id}/${projectId}.json`;
    const { data: urlData } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

    if (!urlData) {
        throw new Error("Could not get public URL for project.");
    }
    const urlWithCacheBust = `${urlData.publicUrl}?t=${Date.now()}`;
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(urlWithCacheBust, {
        headers: {
            'Authorization': `Bearer ${session?.access_token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to download project: ${response.statusText}`);
    }

    const projectData = await response.json();
    return projectData;
}

export async function saveProjectData(projectId: string, projectData: { blocks: Block[] }): Promise<void> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Cannot save project: User is not authenticated.");
    }

    if (!projectId) {
        throw new Error("Cannot save project: No project ID provided.");
    }

    try {
        // The third argument (space count) makes the JSON in storage human-readable for easier debugging.
        const jsonString = JSON.stringify(projectData, null, 2);
        const file = new File([jsonString], `${projectId}.json`, { type: "application/json" });

        const { error } = await supabase.storage
            .from('projects')
            .upload(`${user.id}/${projectId}.json`, file, {
                upsert: true,
            });

        if (error) {
            throw error;
        }

        console.log(`Project ${projectId} saved successfully.`);

    } catch (error) {
        console.error(`Error saving project ${projectId}:`, error);
        throw error;
    }
}