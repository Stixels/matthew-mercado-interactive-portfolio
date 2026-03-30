import type { Metadata } from "next";

export const siteConfig = {
  name: "Matthew Mercado",
  portfolioName: "Matthew Mercado Portfolio",
  defaultTitle: "Matthew Mercado | Software Engineer Portfolio",
  description:
    "Interactive portfolio and case studies from Matthew Mercado, a software engineer focused on product design, conversion-driven web experiences, escape room software, and hardware-integrated systems.",
  keywords: [
    "Matthew Mercado",
    "Matthew Mercado portfolio",
    "software engineer",
    "frontend engineer",
    "full-stack engineer",
    "backend engineer",
    "product designer",
    "interactive portfolio",
    "Next.js portfolio",
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
