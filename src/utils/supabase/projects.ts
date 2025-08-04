import { createClient } from "@/utils/supabase/client";
import { Project, ProjectData } from "@/models/project";
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

export async function getProjectData(projectId: string): Promise<ProjectData | null> {
    if (!projectId) {
        console.error("getProjectData: No project ID provided.");
        return null;
    }
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error("getProjectData: User not authenticated.");
        return null;
    }

    try {
        const { data: blob, error } = await supabase.storage
            .from('projects')
            .download(`${user.id}/${projectId}.json`);

        if (error) {
            throw error;
        }

        const text = await blob.text();
        const projectData = JSON.parse(text) as ProjectData;
        return projectData;
    } catch (error) {
        console.error(`Error fetching project data for ${projectId}:`, error);
        return null;
    }
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