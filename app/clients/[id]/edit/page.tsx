import { clients } from '@/lib/clients';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export default function EditClientPage({ params }: Props) {
  const client = clients.find((c) => c.id === params.id);
  if (!client) {
    return <p>Client not found.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Client</h1>
      <form className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={client.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact Person</Label>
          <Input id="contact" defaultValue={client.contact} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={client.email}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            pattern="\\(\\d{3}\\) \\d{3}-\\d{4}"
            defaultValue={client.phone}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Linked Project</Label>
          <Input id="project" defaultValue={client.projectName} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientNumber">Client Number</Label>
          <Input
            id="clientNumber"
            type="text"
            inputMode="numeric"
            pattern="\\d{3}"
            defaultValue={client.clientNumber}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit">Save</Button>
          <Link href="/clients" className="text-sm text-blue-600 underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
