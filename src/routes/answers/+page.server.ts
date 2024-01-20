import { db } from "$lib/client";

export async function load() {
  const { data } = await db.from("Businesses-Answers").select();
  console.log(data)
  return {
    Businesses: data ?? [],
  };
}