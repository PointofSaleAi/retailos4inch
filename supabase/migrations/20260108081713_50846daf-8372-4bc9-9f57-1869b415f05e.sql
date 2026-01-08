-- Create storage bucket for customer avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('customer-avatars', 'customer-avatars', true);

-- Allow anyone to view customer avatars
CREATE POLICY "Customer avatars are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'customer-avatars');

-- Allow anyone to upload customer avatars
CREATE POLICY "Anyone can upload customer avatars"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'customer-avatars');

-- Allow anyone to update customer avatars
CREATE POLICY "Anyone can update customer avatars"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'customer-avatars');

-- Allow anyone to delete customer avatars
CREATE POLICY "Anyone can delete customer avatars"
ON storage.objects
FOR DELETE
USING (bucket_id = 'customer-avatars');