'use server';

import { supabase } from './supabaseClient';
import { Client, Invoice, Project, TimeEntry } from './types';
import { unstable_noStore as noStore } from 'next/cache';

export async function getClients() {
  noStore();
  const { data, error } = await supabase
    .from('clients')
    .select('id,name,email,company_name,phone,client_number,contact_person')
    .order('name');
  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching clients:', error.message);
    return [] as Client[];
  }
  return (data ?? []) as Client[];
}

export async function getClientById(id: string) {
  noStore();
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching client:', error.message);
    return null;
  }
  return data as Client;
}

export async function getProjects() {
  noStore();
  const { data, error } = await supabase
    .from('projects')
    .select('*, clients(name)')
    .order('name');

  if (error) {
    console.error('Error fetching projects:', error.message);
    return [] as Project[];
  }
  return (data ?? []) as Project[];
}

export async function getProjectById(id: string) {
  noStore();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error.message);
    return null;
  }
  return data as Project;
}

export async function getTimeEntries() {
  noStore();
  const { data, error } = await supabase
    .from('time_entries')
    .select('*, projects(*, clients(name))')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching time entries:', error.message);
    return [] as TimeEntry[];
  }
  return (data ?? []) as TimeEntry[];
}

export async function getTimeEntryById(id: string) {
  noStore();
  const { data, error } = await supabase
    .from('time_entries')
    .select('*, projects(*, clients(name))')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching time entry:', error.message);
    return null;
  }
  return data as TimeEntry;
}

export async function getInvoices() {
  noStore();
  const { data, error } = await supabase
    .from('invoices')
    .select('*, clients(name)')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching invoices:', error.message);
    return [] as Invoice[];
  }
  return (data ?? []) as Invoice[];
}
