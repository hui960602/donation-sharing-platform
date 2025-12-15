import { supabase } from "@/integrations/supabase/client";

export interface DatabaseDonatedItem {
  id: string;
  name: string;
  description: string | null;
  category: string;
  condition: string;
  location: string;
  contact_email: string;
  image_url: string | null;
  created_at: string;
}

export async function getDonatedItemsFromDB(): Promise<DatabaseDonatedItem[]> {
  const { data, error } = await supabase
    .from('donated_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching donated items:", error);
    return [];
  }

  return data || [];
}

export async function saveDonatedItemToDB(item: {
  name: string;
  description: string;
  category: string;
  condition: string;
  location: string;
  contact_email: string;
  image_url: string;
}): Promise<{ data: DatabaseDonatedItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('donated_items')
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error("Error saving donated item:", error);
    return { data: null, error: new Error(error.message) };
  }

  return { data, error: null };
}

export async function deleteDonatedItemFromDB(itemId: string): Promise<boolean> {
  const { error } = await supabase
    .from('donated_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error("Error deleting donated item:", error);
    return false;
  }

  return true;
}

export function subscribeToItemChanges(
  onInsert: (item: DatabaseDonatedItem) => void,
  onDelete: (id: string) => void
) {
  const channel = supabase
    .channel('donated-items-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'donated_items'
      },
      (payload) => {
        onInsert(payload.new as DatabaseDonatedItem);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'donated_items'
      },
      (payload) => {
        onDelete((payload.old as { id: string }).id);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
