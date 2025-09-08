import { getClientById } from '@/lib/data';
import EditForm from './edit-form';

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await getClientById(params.id);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Client</h1>
      <EditForm client={client} />
    </div>
  );
}
