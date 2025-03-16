import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.API_URL as string;
const supabaseKey = process.env.API_KEY as string;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
