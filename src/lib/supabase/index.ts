import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.API_URL as string;
const supabaseKey = process.env.API_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
