import { db } from "$lib/client";

export async function load() {
  const { data, error } = await db.from("Businesses").select();
  /*const { data, error } = await db
    .from('Businesses')
    .select('*, Businesses_tags!Businesses_tags_id_fkey(*)');*/
    //.select('*, Businesses_tags(*)')
    //.eq('id', 'Businesses_tags.id');

  if (error) {
    console.error(error);
    return;
  }

  return {
    Businesses: data ?? [],
  };
  }