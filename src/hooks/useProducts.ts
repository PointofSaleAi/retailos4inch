import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  isFavorite?: boolean;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  stock: number;
  category: string | null;
}

// Map local images to products by name
import productNew1 from "@/assets/product-new-1.png";
import productNew2 from "@/assets/product-new-2.png";
import productNew3 from "@/assets/product-new-3.png";

const imageMap: Record<string, string> = {
  'Brown Oversized Shirt': productNew1,
  'Black Casual Shirt': productNew2,
  'Beige Linen Shirt': productNew3,
  'Brown Classic Shirt': productNew1,
  'Black Premium Shirt': productNew2,
  'Beige Summer Shirt': productNew3,
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    const mapped = (data as DbProduct[]).map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      image: p.image_url || imageMap[p.name] || productNew1,
      stock: p.stock,
      isFavorite: false,
    }));

    setProducts(mapped);
    setLoading(false);
  };

  const deductStock = async (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return false;

    const newStock = Math.max(0, product.stock - quantity);
    
    const { error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', productId);

    if (error) {
      console.error('Error updating stock:', error);
      return false;
    }

    return true;
  };

  const toggleFavorite = (productId: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  useEffect(() => {
    fetchProducts();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const updated = payload.new as DbProduct;
            setProducts(prev =>
              prev.map(p =>
                p.id === updated.id
                  ? {
                      ...p,
                      stock: updated.stock,
                      price: Number(updated.price),
                      name: updated.name,
                    }
                  : p
              )
            );
          } else if (payload.eventType === 'INSERT') {
            const inserted = payload.new as DbProduct;
            setProducts(prev => [
              ...prev,
              {
                id: inserted.id,
                name: inserted.name,
                price: Number(inserted.price),
                image: inserted.image_url || imageMap[inserted.name] || productNew1,
                stock: inserted.stock,
                isFavorite: false,
              },
            ]);
          } else if (payload.eventType === 'DELETE') {
            const deleted = payload.old as { id: string };
            setProducts(prev => prev.filter(p => p.id !== deleted.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    products,
    loading,
    deductStock,
    toggleFavorite,
    refetch: fetchProducts,
  };
};
