import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const clients = [
  {
    name: 'Acme Corp',
    contact: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    project: 'project-alpha',
    projectName: 'Project Alpha',
  },
  {
    name: 'Globex Inc',
    contact: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(987) 654-3210',
    project: 'project-beta',
    projectName: 'Project Beta',
  },
];

export default function ClientsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client List</h1>
        <Button>Create a new client</Button>
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow key={client.email}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.contact}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Link href={`/projects/${client.project}`}>{client.projectName}</Link>
              </TableCell>
              <TableCell>{String(index + 1).padStart(3, '0')}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
