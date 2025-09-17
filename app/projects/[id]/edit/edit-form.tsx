'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Project } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  client_id: z.string().uuid(),
  budget_hours: z.number().nullable(),
  is_active: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function EditForm({ project }: { project: Project }) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: project.name,
      client_id: project.client_id,
      budget_hours: project.budget_hours,
      is_active: project.is_active,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', project.id);

    if (error) {
      console.error('Error updating project:', error);
    } else {
      router.push('/projects');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register('name')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="client_id">Client ID</Label>
        <Input id="client_id" {...form.register('client_id')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget_hours">Budget Hours</Label>
        <Input id="budget_hours" type="number" {...form.register('budget_hours', { valueAsNumber: true })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="is_active">Active</Label>
        <Input id="is_active" type="checkbox" {...form.register('is_active')} />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit">Save</Button>
        <Link href="/projects" className="text-sm text-blue-600 underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
