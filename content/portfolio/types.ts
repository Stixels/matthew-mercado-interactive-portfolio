import type { LucideIcon } from "lucide-react";

export type ProjectId =
  | "escape-director"
  | "waiver-director"
  | "escape-this-frederick"
  | "level-up-vr"
  | "hardware"
  | "portfolio"
  | "contact";
export type PuzzleId = "auth" | "network" | "frequency" | "matrix";

export type ProjectSection = {
  icon: LucideIcon;
  title: string;
  content: string;
  span?: "full";
};

export type ScreenshotDetail = {
  label: string;
  description: string;
};

export type PortfolioColor =
  | "neon-blue"
  | "neon-purple"
  | "neon-green"
  | "error-red";

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
  liveUrl?: string;
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
