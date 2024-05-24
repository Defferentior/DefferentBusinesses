import { db } from "$lib/client";
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {

    const getID = url.pathname.split('/').pop();

    if(!getID) {
        return redirect(303,'/');
        }

    const { data, error } = await db.from("Businesses").select().eq('id',getID).single();
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