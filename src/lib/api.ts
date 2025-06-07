import { supabase } from './supabase';
import { Consignment, HeldItem, ItemIdentifier, ReleaseRecord } from '../types';

export async function createConsignment(data: Partial<Consignment>) {
  // First check if consignment already exists
  const { data: existing } = await supabase
    .from('consignments')
    .select('*')
    .eq('consignment_id', data.consignment_id)
    .maybeSingle();

  if (existing) {
    return existing;
  }

  const { data: consignment, error } = await supabase
    .from('consignments')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return consignment;
}

export async function createHeldItem(data: Partial<HeldItem>) {
  const { data: heldItem, error } = await supabase
    .from('held_items')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return heldItem;
}

export async function createItemIdentifiers(identifiers: Partial<ItemIdentifier>[]) {
  const { data, error } = await supabase
    .from('item_identifiers')
    .insert(identifiers)
    .select();

  if (error) throw error;
  return data;
}

export async function createReleaseRecord(data: Partial<ReleaseRecord>) {
  const { data: releaseRecord, error } = await supabase
    .from('release_records')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return releaseRecord;
}

export async function getConsignments() {
  const { data, error } = await supabase
    .from('consignments')
    .select(`
      *,
      held_items (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getConsignmentById(consignmentId: string) {
  const { data, error } = await supabase
    .from('consignments')
    .select(`
      *,
      held_items (
        *,
        item_identifiers (*)
      )
    `)
    .eq('consignment_id', consignmentId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateHeldItemStatus(id: string, status: 'held' | 'released') {
  const { data, error } = await supabase
    .from('held_items')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateConsignmentStatus(id: string, status: 'held' | 'released' | 'partial') {
  const { data, error } = await supabase
    .from('consignments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDashboardStats() {
  try {
    const { data: consignments, error: consignmentsError } = await supabase
      .from('consignments')
      .select('status');

    if (consignmentsError) throw consignmentsError;

    const { data: heldItems, error: heldItemsError } = await supabase
      .from('held_items')
      .select('status');

    if (heldItemsError) throw heldItemsError;

    return {
      activeConsignments: consignments?.length || 0,
      itemsHeld: heldItems?.filter(item => item.status === 'held').length || 0,
      itemsReleased: heldItems?.filter(item => item.status === 'released').length || 0,
      pendingReview: consignments?.filter(c => c.status === 'partial').length || 0
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      activeConsignments: 0,
      itemsHeld: 0,
      itemsReleased: 0,
      pendingReview: 0
    };
  }
}