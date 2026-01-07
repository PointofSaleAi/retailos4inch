import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  email?: string;
  loyaltyPoints?: number;
  customerSince?: string;
  tax?: string;
  companyName?: string;
  birthday?: string;
  anniversary?: string;
  address?: string;
  notes?: string;
}

interface DbCustomer {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  loyalty_points: number | null;
  customer_since: string | null;
  tax: string | null;
  company_name: string | null;
  birthday: string | null;
  anniversary: string | null;
  address: string | null;
  notes: string | null;
}

const mapDbCustomer = (dbCustomer: DbCustomer): Customer => ({
  id: dbCustomer.id,
  name: dbCustomer.name,
  phone: dbCustomer.phone || '',
  email: dbCustomer.email || undefined,
  avatar: dbCustomer.avatar_url || undefined,
  loyaltyPoints: dbCustomer.loyalty_points || 0,
  customerSince: dbCustomer.customer_since || undefined,
  tax: dbCustomer.tax || undefined,
  companyName: dbCustomer.company_name || undefined,
  birthday: dbCustomer.birthday || undefined,
  anniversary: dbCustomer.anniversary || undefined,
  address: dbCustomer.address || undefined,
  notes: dbCustomer.notes || undefined,
});

export const useCustomerSearch = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all customers on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('name');

        if (error) throw error;
        const mapped = (data || []).map(mapDbCustomer);
        setCustomers(mapped);
        setSearchResults(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch customers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Search customers by name or phone
  const searchCustomers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(customers);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .or(`name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`)
        .order('name')
        .limit(20);

      if (error) throw error;
      setSearchResults((data || []).map(mapDbCustomer));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, [customers]);

  // Add a new customer
  const addCustomer = useCallback(async (customerData: Omit<Customer, 'id'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name: customerData.name,
          phone: customerData.phone || null,
          email: customerData.email || null,
          avatar_url: customerData.avatar || null,
          loyalty_points: customerData.loyaltyPoints || 0,
          tax: customerData.tax || null,
          company_name: customerData.companyName || null,
          birthday: customerData.birthday || null,
          anniversary: customerData.anniversary || null,
          address: customerData.address || null,
          notes: customerData.notes || null,
        })
        .select()
        .single();

      if (error) throw error;
      
      const newCustomer = mapDbCustomer(data);
      setCustomers(prev => [...prev, newCustomer]);
      setSearchResults(prev => [...prev, newCustomer]);
      return newCustomer;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add customer');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    customers,
    searchResults,
    isLoading,
    error,
    searchCustomers,
    addCustomer,
  };
};
