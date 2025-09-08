-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table storing additional profile information
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    role text NOT NULL DEFAULT 'user'
);

-- Clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text,
    company_name text
);

-- Projects linked to clients
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    client_id uuid REFERENCES public.clients (id) ON DELETE SET NULL,
    budget_hours integer,
    is_active boolean NOT NULL DEFAULT true
);

-- Time entries linked to users and projects
CREATE TABLE IF NOT EXISTS public.time_entries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users (id) ON DELETE CASCADE,
    project_id uuid REFERENCES public.projects (id) ON DELETE CASCADE,
    date date NOT NULL,
    duration integer NOT NULL,
    description text
);

-- Invoices linked to clients
CREATE TABLE IF NOT EXISTS public.invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients (id) ON DELETE CASCADE,
    date date NOT NULL DEFAULT now(),
    total_amount numeric(10,2) NOT NULL,
    status text NOT NULL
);

-- Invoice line items
CREATE TABLE IF NOT EXISTS public.invoice_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid REFERENCES public.invoices (id) ON DELETE CASCADE,
    description text NOT NULL,
    hours numeric NOT NULL,
    rate numeric NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Users manage own profile" ON public.users
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated read" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Authenticated write" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated write" ON public.clients FOR UPDATE USING (true);
CREATE POLICY "Authenticated read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated write" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated write" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Individuals manage own time entries" ON public.time_entries
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Authenticated read" ON public.invoices FOR SELECT USING (true);
CREATE POLICY "Authenticated write" ON public.invoices FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated write" ON public.invoices FOR UPDATE USING (true);
CREATE POLICY "Authenticated read" ON public.invoice_items FOR SELECT USING (true);
CREATE POLICY "Authenticated write" ON public.invoice_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated write" ON public.invoice_items FOR UPDATE USING (true);

