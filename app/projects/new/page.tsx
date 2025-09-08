'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { getClients } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Client } from '@/lib/types';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  client_id: z.string().uuid(),
  budget_hours: z.number().nullable(),
});

type FormValues = z.infer<typeof schema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      client_id: '',
      budget_hours: null,
    },
  });

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getClients();
      setClients(clients);
    };
    fetchClients();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase.from('projects').insert(data);

    if (error) {
      console.error('Error creating project:', error);
    } else {
      router.push('/projects');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Project</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register('name')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_id">Client</Label>
          <select id="client_id" {...form.register('client_id')} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget_hours">Budget Hours</Label>
          <Input id="budget_hours" type="number" {...form.register('budget_hours', { valueAsNumber: true })} />
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit">Save</Button>
          <Link href="/projects" className="text-sm text-blue-600 underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
