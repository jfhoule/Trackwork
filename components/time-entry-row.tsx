import { Card, CardContent } from '@/components/ui/card';
import { TimeEntry } from '@/lib/types';
import Link from 'next/link';

interface Props {
  entry: TimeEntry;
}

export function TimeEntryRow({ entry }: Props) {
  return (
    <Card className="mb-2">
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-medium">{entry.projects?.name}</p>
          <p className="text-xs text-gray-500">{entry.projects?.clients?.name}</p>
          <p className="text-xs text-gray-500">{entry.description || 'No description'}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-mono text-sm">{(entry.duration / 60).toFixed(2)}h</p>
          <Link href={`/time/${entry.id}/edit`} className="text-sm text-blue-600 underline">
            Edit
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
