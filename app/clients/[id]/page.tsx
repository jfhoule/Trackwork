import Link from 'next/link';
import { getClientById } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default async function ViewClientPage({ params }: { params: { id: string } }) {
  const client = await getClientById(params.id);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client Details</h1>
        <Button asChild>
          <Link href={`/clients/${client.id}/edit`}>Edit</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="text-sm text-gray-500">Name</div>
          <div className="font-medium">{client.name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Contact Person</div>
          <div className="font-medium">{client.contact_person}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Email</div>
          <div className="font-medium">{client.email}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Phone</div>
          <div className="font-medium">{client.phone}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Linked Project / Company</div>
          <div className="font-medium">{client.company_name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Client Number</div>
          <div className="font-medium">{client.client_number}</div>
        </div>
      </div>
      <div>
        <Link href="/clients" className="text-blue-600 underline">Back to list</Link>
      </div>
    </div>
  );
}

