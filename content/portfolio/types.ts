import type { LucideIcon } from 'lucide-react';

export type ProjectId = 'core' | 'data' | 'terminal' | 'security' | 'ai' | 'contact';
export type PuzzleId = 'auth' | 'network' | 'frequency' | 'matrix';

export type ProjectSection = {
  icon: LucideIcon;
  title: string;
  content: string;
  span?: 'full';
};

export type PortfolioColor = 'neon-blue' | 'neon-purple' | 'neon-green' | 'error-red';

export type PortfolioProject = {
  id: ProjectId;
  title: string;
  hubTitle?: string;
  seoTitle: string;
  seoDescription: string;
  hubSubtitle: string;
  icon: LucideIcon;
  level: number;
  puzzleType: PuzzleId | null;
  tag: 'ACTIVE' | 'DEPLOYED' | 'RESTRICTED' | 'EXPERIMENTAL' | 'VERIFIED';
  status: 'ACTIVE' | 'DEPLOYED' | 'RESTRICTED' | 'EXPERIMENTAL' | 'VERIFIED';
  role: string;
  timeline: string;
  stack: string[];
  overview: string;
  color: PortfolioColor;
  sections?: ProjectSection[];
  seoKeywords?: string[];
};

export type PortfolioPuzzle = {
  id: PuzzleId;
  label: string;
  color: PortfolioColor;
  hex: string;
  description: string;
};
