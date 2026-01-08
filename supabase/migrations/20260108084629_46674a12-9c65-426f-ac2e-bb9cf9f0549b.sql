-- Create products table with stock tracking
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  sku TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (retail app)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for products table
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- Insert initial product data
INSERT INTO public.products (name, price, stock, category) VALUES
  ('Brown Oversized Shirt', 24.99, 12, 'apparel'),
  ('Black Casual Shirt', 49.99, 8, 'apparel'),
  ('Beige Linen Shirt', 79.99, 5, 'apparel'),
  ('Brown Classic Shirt', 89.99, 15, 'apparel'),
  ('Black Premium Shirt', 129.99, 3, 'apparel'),
  ('Beige Summer Shirt', 54.99, 0, 'apparel');