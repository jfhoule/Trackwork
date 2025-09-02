'use client';

import { useState } from 'react';
import { TimerCard } from '@/components/timer-card';
import { TimeEntryRow } from '@/components/time-entry-row';
import { ManualTimeEntryDialog } from '@/components/manual-time-entry-dialog';
import { Button } from '@/components/ui/button';
import { TimeEntry } from '@/lib/types';

const mockEntries: TimeEntry[] = [
  {
    id: '1',
    user_id: '1',
    project_id: '1',
    date: '2024-01-01',
    duration: 120,
    description: 'Design work',
  },
];

export default function TimePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <TimerCard />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Today</h2>
        <Button onClick={() => setOpen(true)}>+ Add Manual Entry</Button>
      </div>
      <div>
        {mockEntries.map((e) => (
          <TimeEntryRow key={e.id} entry={e} />
        ))}
      </div>
      <ManualTimeEntryDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
