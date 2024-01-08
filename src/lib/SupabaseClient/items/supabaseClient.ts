import { createClient } from "@supabase/supabase-js";
import type { Database } from "./SupabaseTypes"; // our generated types
import dotenv from 'dotenv';

dotenv.config();

export const db = createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ACCESS_TOKEN
)
