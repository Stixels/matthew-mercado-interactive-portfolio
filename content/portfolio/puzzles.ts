import { portfolioProjects } from './projects';
import type { PortfolioProject, PortfolioPuzzle, PuzzleId } from './types';

const colorHexByToken: Record<PortfolioProject['color'], string> = {
  'neon-blue': '#4CC9F0',
  'neon-purple': '#9D4EDD',
  'neon-green': '#72EFDD',
  'error-red': '#FF4D6D',
};

const puzzleDescriptionById: Record<PuzzleId, string> = {
  auth: 'MATCH THE CIPHER CODE',
  network: 'ROUTE THE SIGNAL',
  frequency: 'CALIBRATE FREQUENCIES',
  matrix: 'MEMORISE & REPEAT',
};

export const puzzleProjects = portfolioProjects.filter(
  (project): project is PortfolioProject & { puzzleType: PuzzleId } => project.puzzleType !== null
);

export const puzzleProjectIds = puzzleProjects.map((project) => project.id);

export const puzzleByProjectId = Object.fromEntries(
  puzzleProjects.map((project) => [
    project.id,
    {
      id: project.puzzleType,
      label: project.hubTitle ?? project.title,
      color: project.color,
      hex: colorHexByToken[project.color],
      description: puzzleDescriptionById[project.puzzleType],
    } satisfies PortfolioPuzzle,
  ])
) as Record<(typeof puzzleProjectIds)[number], PortfolioPuzzle>;

export function getPuzzleByProjectId(id: string) {
  return Object.prototype.hasOwnProperty.call(puzzleByProjectId, id)
    ? puzzleByProjectId[id as keyof typeof puzzleByProjectId]
    : null;
}
