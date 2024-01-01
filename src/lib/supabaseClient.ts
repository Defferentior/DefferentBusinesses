import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types"; // our generated types
import dotenv from 'dotenv';

dotenv.config();

console.log('testing');

export const db = createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ACCESS_TOKEN
)
