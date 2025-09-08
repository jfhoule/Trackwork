import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Client</h1>
      <form className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact Person</Label>
          <Input id="contact" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            pattern="\(\d{3}\) \d{3}-\d{4}"
            placeholder="(123) 456-7890"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Linked Project</Label>
          <Input id="project" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientNumber">Client Number</Label>
          <Input id="clientNumber" type="text" inputMode="numeric" pattern="\d{3}" required />
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

