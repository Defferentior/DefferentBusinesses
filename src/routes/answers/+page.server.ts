import { db } from "$lib/client";

export async function load() {
  const { data } = await db.from("Businesses-Answers").select();
  return {
    Businesses: data ?? [],
  };
}