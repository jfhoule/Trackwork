import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Eye, Plus } from 'lucide-react';
import { getClients } from '@/lib/data';

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client List</h1>
        <Link href="/clients/new">
          <Button className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/90 transition-colors">
            <Plus className="h-4 w-4" />
            Create a new client
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Linked Project</TableHead>
            <TableHead>Client Number</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.contact_person}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Link href={`/projects/${client.id}`}>{client.company_name}</Link>
              </TableCell>
              <TableCell>{client.client_number}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/clients/${client.id}/edit`}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  aria-label={`Edit ${client.name}`}
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/clients/${client.id}`}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  aria-label={`View ${client.name}`}
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
