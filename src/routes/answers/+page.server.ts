import { db } from "$lib/client";

export async function load() {
  const { data } = await db.from("Businesses-Answers").select()
  .not('answers', 'eq', null);
  return {
    Businesses: data ?? [],
  };
}