import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PuzzleView from "@/components/PuzzleView";
import {
  getProjectById,
  getPuzzleByProjectId,
  puzzleProjectIds,
} from "@/content/portfolio";
import { buildMetadata } from "@/config/site";

type PuzzlePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PuzzlePageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  const puzzle = getPuzzleByProjectId(id);

  if (!project || !puzzle) {
    return buildMetadata({
      title: "Challenge Not Found",
      description: "The requested portfolio challenge could not be found.",
      path: "/hub",
      index: false,
    });
  }

  return buildMetadata({
    title: `${project.seoTitle} Systems Lab`,
    description: `Optional interactive challenge inspired by the ${project.seoTitle} project in Matthew Mercado's portfolio.`,
    path: `/puzzles/${project.id}`,
    keywords: ["interactive challenge", "portfolio puzzle", project.title],
    index: false,
  });
}

export function generateStaticParams() {
  return puzzleProjectIds.map((id) => ({ id }));
}

export default async function PuzzlePage({ params }: PuzzlePageProps) {
  const { id } = await params;
  const puzzle = getPuzzleByProjectId(id);

  if (!puzzle) {
    notFound();
  }

  return <PuzzleView projectId={id} />;
}
