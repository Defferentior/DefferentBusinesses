import { createClient } from "@supabase/supabase-js";
import type { Database } from "./SupabaseTypes"; // our generated types
import { env } from '$env/dynamic/private';


export const db = createClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_ACCESS_TOKEN
)
