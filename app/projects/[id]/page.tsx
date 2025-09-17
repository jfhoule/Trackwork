import Link from 'next/link';
import { getProjectById } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default async function ViewProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Project Details</h1>
        <Button asChild>
          <Link href={`/projects/${project.id}/edit`}>Edit</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="text-sm text-gray-500">Name</div>
          <div className="font-medium">{project.name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Active</div>
          <div className="font-medium">{project.is_active ? 'Yes' : 'No'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Budget Hours</div>
          <div className="font-medium">{project.budget_hours ?? '-'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Client</div>
          <div className="font-medium">{project.clients?.name ?? '-'}</div>
        </div>
      </div>
      <div>
        <Link href="/projects" className="text-blue-600 underline">Back to list</Link>
      </div>
    </div>
  );
}

