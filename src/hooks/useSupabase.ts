import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [session, setSession] = useState(supabase.auth.getSession());

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}

export function useConsignments() {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsignments = async () => {
      try {
        const { data, error } = await supabase
          .from('consignments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setConsignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsignments();
  }, []);

  return { consignments, loading, error };
}

export function useHeldItems(consignmentId?: string) {
  const [heldItems, setHeldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeldItems = async () => {
      try {
        const query = supabase
          .from('held_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (consignmentId) {
          query.eq('consignment_id', consignmentId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setHeldItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeldItems();
  }, [consignmentId]);

  return { heldItems, loading, error };
}