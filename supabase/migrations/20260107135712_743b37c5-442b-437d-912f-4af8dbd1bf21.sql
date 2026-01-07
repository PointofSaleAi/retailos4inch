-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  loyalty_points INTEGER DEFAULT 0,
  customer_since TIMESTAMP WITH TIME ZONE DEFAULT now(),
  tax TEXT,
  company_name TEXT,
  birthday DATE,
  anniversary DATE,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (retail POS needs to look up customers)
CREATE POLICY "Customers are viewable by everyone" 
ON public.customers 
FOR SELECT 
USING (true);

-- Create policy for public insert access
CREATE POLICY "Anyone can create customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public update access
CREATE POLICY "Anyone can update customers" 
ON public.customers 
FOR UPDATE 
USING (true);

-- Create index for faster name search
CREATE INDEX idx_customers_name ON public.customers USING GIN (to_tsvector('english', name));

-- Create index for phone search
CREATE INDEX idx_customers_phone ON public.customers (phone);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample customers
INSERT INTO public.customers (name, phone, email, loyalty_points) VALUES
  ('Micheal David', '+1 (122) 586-7854', 'micheal@example.com', 120),
  ('Alex Venom', '+1 (122) 456-7890', 'alex@example.com', 85),
  ('Arjun Gerhold', '+1 (122) 456-5456', 'arjun@example.com', 50),
  ('Cleora Hills', '+1 (122) 456-8495', 'cleora@example.com', 200),
  ('Eden Kautzer', '+1 (122) 456-9865', 'eden@example.com', 150),
  ('Morticia Adams', '+1 (122) 456-1562', 'morticia@example.com', 75);