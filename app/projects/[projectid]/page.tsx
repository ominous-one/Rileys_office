import { notFound } from 'next/navigation';
import { ProjectOfficeView } from '@/components/project/project-office-view';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const adapter = createOfficeAdapter();
  const office = await adapter.getProjectOffice(projectId);

  if (!office) {
    notFound();
  }

  return <ProjectOfficeView office={office} />;
}
