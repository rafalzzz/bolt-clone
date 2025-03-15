import { supabase } from '@/lib/supabase';

const deleteUser = async (userId: string) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw error;
  }
};

export default deleteUser;
