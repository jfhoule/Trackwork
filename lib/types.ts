export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
}

export interface Client {
  id: string;
  name: string;
  email: string | null;
  company_name: string | null;
  phone?: string | null;
  client_number?: string | null;
  contact_person?: string | null;
}

export interface Project {
  id: string;
  name: string;
  client_id: string;
  budget_hours: number | null;
  is_active: boolean;
  clients: { name: string } | null;
}

export interface TimeEntry {
  id: string;
  user_id: string;
  project_id: string;
  date: string; // ISO date
  duration: number; // minutes
  description: string | null;
  projects: Project | null;
}

export interface Invoice {
  id: string;
  client_id: string;
  date: string; // ISO date
  total_amount: number;
  status: string;
  clients: { name: string } | null;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  hours: number;
  rate: number;
}
