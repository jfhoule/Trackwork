'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TimeEntry } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const schema = z.object({
  project_id: z.string().uuid(),
  date: z.string(),
  duration: z.number(),
  description: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;

export default function EditForm({ timeEntry }: { timeEntry: TimeEntry }) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      project_id: timeEntry.project_id,
      date: timeEntry.date,
      duration: timeEntry.duration,
      description: timeEntry.description,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase
      .from('time_entries')
      .update(data)
      .eq('id', timeEntry.id);

    if (error) {
      console.error('Error updating time entry:', error);
    } else {
      router.push('/time');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="project_id">Project</Label>
        <Input id="project_id" {...form.register('project_id')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...form.register('date')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input id="duration" type="number" {...form.register('duration', { valueAsNumber: true })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...form.register('description')} />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit">Save</Button>
        <Link href="/time" className="text-sm text-blue-600 underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
