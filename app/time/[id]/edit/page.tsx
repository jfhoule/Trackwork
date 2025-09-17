import { getTimeEntryById } from '@/lib/data';
import EditForm from './edit-form';

export default async function EditTimeEntryPage({ params }: { params: { id: string } }) {
  const timeEntry = await getTimeEntryById(params.id);

  if (!timeEntry) {
    return <div>Time entry not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Time Entry</h1>
      <EditForm timeEntry={timeEntry} />
    </div>
  );
}