import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Lazy initialization to avoid errors during build
let _supabase: SupabaseClient | null = null;

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!_supabase) {
      _supabase = createSupabaseClient();
    }
    return (_supabase as Record<string, unknown>)[prop as string];
  },
});
