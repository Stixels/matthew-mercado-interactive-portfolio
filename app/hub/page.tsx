import type { Metadata } from "next";
import SystemHub from "@/components/SystemHub";
import { buildMetadata } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Systems Lab — Breach Console",
  description:
    "Solve four interactive challenges to unlock Matthew Mercado's hidden operator dossier.",
  path: "/hub",
  keywords: ["interactive portfolio", "engineering puzzles", "systems lab"],
});

export default function HubPage() {
  return <SystemHub />;
}
