import { db } from "$lib/SupabaseClient";

export async function load() {
    const { data } = await db.from("Businesses").select();
    return {
      Businesses: data ?? [],
    };
  }