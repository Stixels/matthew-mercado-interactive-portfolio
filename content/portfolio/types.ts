import type { LucideIcon } from "lucide-react";

export type ProjectId =
  | "escape-director"
  | "ai-agent-platform"
  | "waiver-director"
  | "escape-this-frederick"
  | "level-up-vr"
  | "hardware"
  | "portfolio"
  | "contact";
export type PuzzleId = "auth" | "network" | "frequency" | "matrix";

export type ProjectSection = {
  title: string;
  content: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ScreenshotDetail = {
  label: string;
  description: string;
};

export type PortfolioColor =
  "neon-blue" | "neon-purple" | "neon-green" | "error-red";

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
  tag: "ACTIVE" | "DEPLOYED" | "RESTRICTED" | "EXPERIMENTAL" | "VERIFIED";
  status: "ACTIVE" | "DEPLOYED" | "RESTRICTED" | "EXPERIMENTAL" | "VERIFIED";
  role: string;
  timeline: string;
  stack: string[];
  overview: string;
  /** The situation the work answered, told in a few sentences. */
  challenge?: string;
  /** Headline numbers shown on the case page. */
  metrics?: ProjectMetric[];
  /** Short proof chips shown on the homepage case card. */
  outcomes?: string[];
  /** Shown when a case has no screenshots to explain why. */
  mediaNote?: string;
  liveUrl?: string;
  docsUrl?: string;
  color: PortfolioColor;
  sections?: ProjectSection[];
  seoKeywords?: string[];
  screenshots?: string[];
  screenshotDetails?: ScreenshotDetail[];
};

export type PortfolioPuzzle = {
  id: PuzzleId;
  label: string;
  color: PortfolioColor;
  hex: string;
  description: string;
};
