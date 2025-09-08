import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Pencil, Plus } from 'lucide-react';
import { getProjects } from '@/lib/data';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/projects/new">
          <Button className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/90 transition-colors">
            <Plus className="h-4 w-4" />
            Create a new project
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead className="hidden md:table-cell">Client</TableHead>
            <TableHead className="hidden md:table-cell">Start Date</TableHead>
            <TableHead>Hours Spent</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell className="hidden md:table-cell">{project.clients?.name}</TableCell>
              <TableCell className="hidden md:table-cell">{project.is_active}</TableCell>
              <TableCell>{project.budget_hours}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  aria-label={`Edit ${project.name}`}
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  aria-label={`View ${project.name}`}
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
