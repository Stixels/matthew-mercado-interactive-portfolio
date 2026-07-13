import type { Metadata } from "next";
import HomeGate from "@/components/HomeGate";
import { buildMetadata } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Full-Stack Software Engineer Portfolio",
  description:
    "Selected software engineering work from Matthew Mercado across full-stack web applications, AI-enabled products, immersive interfaces, and connected systems.",
  path: "/",
  keywords: [
    "developer portfolio",
    "AI applications",
    "full-stack case studies",
  ],
});

export default function Home() {
  return <HomeGate />;
}
