import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectView from '@/components/ProjectView';
import { getProjectById, projectIds } from '@/content/portfolio';
import { buildMetadata } from '@/config/site';

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return buildMetadata({
      title: 'Project Not Found',
      description: 'The requested project case study could not be found.',
      path: '/hub',
      index: false,
    });
  }

  return buildMetadata({
    title: project.id === 'contact' ? project.seoTitle : `${project.seoTitle} — Case Study`,
    description: project.seoDescription,
    path: `/projects/${project.id}`,
    keywords: [...project.stack, ...(project.seoKeywords ?? []), project.title],
  });
}

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectView projectId={id} />;
}
