import { Card, CardContent } from '@/components/ui/card';
import { TimeEntry } from '@/lib/types';

interface Props {
  entry: TimeEntry;
}

export function TimeEntryRow({ entry }: Props) {
  return (
    <Card className="mb-2">
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-medium">{entry.description || 'No description'}</p>
          <p className="text-xs text-gray-500">{entry.date}</p>
        </div>
        <p className="font-mono text-sm">{(entry.duration / 60).toFixed(2)}h</p>
      </CardContent>
    </Card>
  );
}
