import type { Metadata } from "next";

export const siteConfig = {
  name: "Matthew Mercado",
  portfolioName: "Matthew Mercado Portfolio",
  defaultTitle: "Matthew Mercado | Full-Stack Software Engineer",
  description:
    "Full-stack software engineering portfolio and case studies from Matthew Mercado, spanning web applications, AI-enabled products, escape room software, and connected systems.",
  keywords: [
    "Matthew Mercado",
    "Matthew Mercado portfolio",
    "software engineer",
    "product engineer",
    "frontend engineer",
    "full-stack engineer",
    "backend engineer",
    "AI engineer",
    "AI applications",
    "product designer",
    "engineering portfolio",
    "case studies",
    "escape room software",
    "hardware systems",
    "developer",
  ],
} as const;

export function getBaseUrl() {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!candidate) {
    return new URL("http://localhost:3000");
  }

  return new URL(
    candidate.startsWith("http") ? candidate : `https://${candidate}`,
  );
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  index = true,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.portfolioName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        },
  };
}
