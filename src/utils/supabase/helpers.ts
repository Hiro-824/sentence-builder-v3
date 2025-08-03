import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Block } from "@/models/block";

const supabase = createClient();

/**
 * Saves the user's block data to Supabase Storage.
 * The data is stored in a JSON file specific to the user and project.
 *
 * @param user - The authenticated Supabase user object.
 * @param blocks - The array of Block objects to be saved.
 * @param projectId - A unique identifier for the project being saved. Defaults to 'default-project'.
 * @returns An object indicating success or failure.
 */
export async function saveBlocksToSupabase(
  user: User,
  blocks: Block[],
  projectId: string = 'default-project'
): Promise<{ success: boolean; error?: string }> {
  if (!user) {
    return { success: false, error: "User is not authenticated." };
  }

  const filePath = `${user.id}/${projectId}.json`;
  
  const dataToStore = JSON.stringify(blocks, null, 2);
  const blob = new Blob([dataToStore], { type: 'application/json' });

  try {
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    console.log('Save successful:', data);
    return { success: true };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during save.';
    console.error('Save failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Lists all project files for a given user from Supabase Storage.
 *
 * @param user - The authenticated Supabase user object.
 * @returns A promise that resolves to an object containing the list of project IDs or an error.
 */
export async function listProjectsForUser(
  user: User
): Promise<{ projects?: string[]; error?: string }> {
  if (!user) {
      return { error: "User is not authenticated." };
  }

  try {
      const { data, error } = await supabase.storage
          .from('projects')
          .list(user.id, {
              limit: 100,
              offset: 0,
              sortBy: { column: 'name', order: 'asc' },
          });

      if (error) {
          throw new Error(error.message);
      }
      
      // Filter out any non-JSON files and remove the .json extension
      const projectIds = data
          .filter(file => file.name.endsWith('.json'))
          .map(file => file.name.replace('.json', ''));

      return { projects: projectIds };

  } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred while listing projects.';
      console.error('Project list failed:', errorMessage);
      return { error: errorMessage };
  }
}


/**
* Loads a specific project's block data from Supabase Storage.
*
* @param user - The authenticated Supabase user object.
* @param projectId - The ID of the project to load.
* @returns A promise that resolves to an object containing the block data or an error.
*/
export async function loadProjectFromSupabase(
  user: User,
  projectId: string
): Promise<{ blocks?: Block[]; error?: string }> {
  if (!user) {
      return { error: "User is not authenticated." };
  }

  const filePath = `${user.id}/${projectId}.json`;

  try {
      const { data, error } = await supabase.storage
          .from('projects')
          .download(filePath);

      if (error) {
          throw new Error(error.message);
      }

      const blocks = JSON.parse(await data.text()) as Block[];
      return { blocks };

  } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred while loading the project.';
      console.error('Project load failed:', errorMessage);
      return { error: errorMessage };
  }
}