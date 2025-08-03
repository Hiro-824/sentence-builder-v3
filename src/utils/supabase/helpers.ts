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