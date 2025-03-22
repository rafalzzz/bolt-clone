import type { SupabaseClient } from '@supabase/supabase-js';

const deleteUser = async (supabase: SupabaseClient, userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw error;
  }
};

export default deleteUser;
