import { db } from "$lib/supabaseClient";

export async function load() {
    console.log('testing')
    const { data } = await db.from("Businesses").select();
    return {
      Businesses: data ?? [],
    };
  }