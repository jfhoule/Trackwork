import { getProjectById } from '@/lib/data';
import EditForm from './edit-form';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <EditForm project={project} />
    </div>
  );
}