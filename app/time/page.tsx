import { TimerCard } from '@/components/timer-card';
import { TimeEntryRow } from '@/components/time-entry-row';
import { ManualTimeEntryDialog } from '@/components/manual-time-entry-dialog';
import { Button } from '@/components/ui/button';
import { getTimeEntries } from '@/lib/data';

export default async function TimePage() {
  const entries = await getTimeEntries();

  return (
    <div className="space-y-4">
      <TimerCard />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Today</h2>
        <ManualTimeEntryDialog />
      </div>
      <div>
        {entries.map((e) => (
          <TimeEntryRow key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
}
