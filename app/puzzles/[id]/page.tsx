import PuzzleView from '@/components/PuzzleView';
export default async function PuzzlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PuzzleView projectId={id} />;
}
