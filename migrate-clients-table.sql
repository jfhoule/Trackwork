-- Migration to add missing columns to clients table
-- Run this in your Supabase SQL editor

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS client_number text,
ADD COLUMN IF NOT EXISTS contact_person text,
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();

-- Update existing clients with default values for new columns
UPDATE public.clients 
SET 
  phone = COALESCE(phone, ''),
  contact_person = COALESCE(contact_person, ''),
  created_at = COALESCE(created_at, now())
WHERE phone IS NULL OR contact_person IS NULL OR created_at IS NULL;

-- Generate unique client numbers for existing clients using a CTE
WITH numbered_clients AS (
  SELECT 
    id,
    lpad((row_number() OVER (ORDER BY id))::text, 4, '0') as new_client_number
  FROM public.clients 
  WHERE client_number IS NULL OR client_number = ''
)
UPDATE public.clients 
SET client_number = numbered_clients.new_client_number
FROM numbered_clients 
WHERE public.clients.id = numbered_clients.id;

-- Now add the unique constraint
ALTER TABLE public.clients 
ADD CONSTRAINT clients_client_number_unique UNIQUE (client_number);