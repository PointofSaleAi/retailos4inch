-- Fix PUBLIC_DATA_EXPOSURE: Secure customer and product tables with authentication-based RLS

-- 1. Drop existing permissive policies on customers table
DROP POLICY IF EXISTS "Customers are viewable by everyone" ON public.customers;
DROP POLICY IF EXISTS "Anyone can create customers" ON public.customers;
DROP POLICY IF EXISTS "Anyone can update customers" ON public.customers;

-- 2. Create authentication-based policies for customers
CREATE POLICY "Authenticated users can view customers" 
ON public.customers FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create customers" 
ON public.customers FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update customers" 
ON public.customers FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete customers" 
ON public.customers FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- 3. Drop existing permissive policies on products table
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Anyone can update products" ON public.products;

-- 4. Create authentication-based policies for products
CREATE POLICY "Authenticated users can view products" 
ON public.products FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update products" 
ON public.products FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert products" 
ON public.products FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete products" 
ON public.products FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- 5. Fix STORAGE_EXPOSURE: Update storage policies for customer-avatars bucket
-- Remove permissive policies if they exist
DROP POLICY IF EXISTS "Anyone can upload customer avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update customer avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete customer avatars" ON storage.objects;
DROP POLICY IF EXISTS "Customer avatars are publicly accessible" ON storage.objects;

-- Keep public read access (avatars need to be viewable publicly)
CREATE POLICY "Customer avatars publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'customer-avatars');

-- Require authentication for uploads
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'customer-avatars' AND
  auth.uid() IS NOT NULL
);

-- Require authentication for updates
CREATE POLICY "Authenticated users can update avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'customer-avatars' AND
  auth.uid() IS NOT NULL
);

-- Require authentication for deletes
CREATE POLICY "Authenticated users can delete avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'customer-avatars' AND
  auth.uid() IS NOT NULL
);