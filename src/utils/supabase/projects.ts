import { createClient } from "@/utils/supabase/client";
import { Project, ProjectData } from "@/models/project";

const PROJECT_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;
const MAX_PROJECT_BYTES = 5 * 1024 * 1024;

function isValidProjectId(projectId: string): boolean {
    return PROJECT_ID_PATTERN.test(projectId);
}

function assertValidProjectId(projectId: string): void {
    if (!isValidProjectId(projectId)) {
        throw new Error("Invalid project ID.");
    }
}

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

        const projects: Project[] = files.flatMap(file => {
            if (!file.name.endsWith('.json')) return [];

            const projectId = file.name.slice(0, -'.json'.length);
            if (!isValidProjectId(projectId)) return [];

            return [{
                id: projectId,
                name: projectId,
                updated_at: file.updated_at,
            }];
        });

        return projects;
    } catch (error) {
        console.error("Error listing projects:", error);
        return [];
    }
}

export async function getProjectData(projectId: string): Promise<ProjectData | null> {
    assertValidProjectId(projectId);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    const filePath = `${user.id}/${projectId}.json`;
    const { data, error } = await supabase.storage
        .from('projects')
        .download(filePath);

    if (error || !data) {
        throw error ?? new Error("Could not download project.");
    }

    if (data.size > MAX_PROJECT_BYTES) {
        throw new Error("Project file is too large.");
    }

    const parsed: unknown = JSON.parse(await data.text());
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error("Project file has an invalid format.");
    }

    const projectData = parsed as Partial<ProjectData>;
    if (!Array.isArray(projectData.blocks)) {
        throw new Error("Project file has an invalid blocks collection.");
    }

    return projectData as ProjectData;
}

export async function saveProjectData(projectId: string, projectData: ProjectData): Promise<void> {
    assertValidProjectId(projectId);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Cannot save project: User is not authenticated.");
    }

    if (!projectId) {
        throw new Error("Cannot save project: No project ID provided.");
    }

    try {
        const jsonString = JSON.stringify(projectData, null, 2); // Keep JSON readable in storage
        if (new Blob([jsonString]).size > MAX_PROJECT_BYTES) {
            throw new Error("Project file is too large.");
        }
        const file = new File([jsonString], `${projectId}.json`, { type: "application/json" });

        const { error } = await supabase.storage
            .from('projects')
            .upload(`${user.id}/${projectId}.json`, file, {
                upsert: true,
                cacheControl: '0',
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
