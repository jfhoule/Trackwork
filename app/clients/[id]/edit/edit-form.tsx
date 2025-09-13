'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Client } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  contact_person: z.string().min(1, 'Required'),
  email: z.string().email(),
  phone: z.string(),
  company_name: z.string(),
  client_number: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function EditForm({ client }: { client: Client }) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: client.name ?? '',
      contact_person: client.contact_person ?? '',
      email: client.email ?? '',
      phone: client.phone ?? '',
      company_name: client.company_name ?? '',
      client_number: client.client_number ?? '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase
      .from('clients')
      .update(data)
      .eq('id', client.id);

    if (error) {
      console.error('Error updating client:', error);
    } else {
      router.push('/clients');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register('name')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact">Contact Person</Label>
        <Input id="contact" {...form.register('contact_person')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register('email')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" {...form.register('phone')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="project">Linked Project</Label>
        <Input id="project" {...form.register('company_name')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clientNumber">Client Number</Label>
        <Input id="clientNumber" type="text" {...form.register('client_number')} />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit">Save</Button>
        <Link href="/clients" className="text-sm text-blue-600 underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
