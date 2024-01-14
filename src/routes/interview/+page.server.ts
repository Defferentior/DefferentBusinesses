import { db } from "$lib/client";

export async function load() {
    const { data } = await db.from("Businesses").select();
    return {
      Businesses: data ?? [],
    };
  }