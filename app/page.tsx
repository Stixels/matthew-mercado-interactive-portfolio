import type { Metadata } from "next";
import HomeGate from "@/components/HomeGate";
import { buildMetadata } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Interactive Developer Portfolio",
  description:
    "Explore an interactive portfolio from Matthew Mercado featuring product case studies, immersive UI work, conversion-driven websites, and hardware-linked systems.",
  path: "/",
  keywords: [
    "developer portfolio",
    "interactive web design",
    "full-stack case studies",
  ],
});

export default function Home() {
  return <HomeGate />;
}
