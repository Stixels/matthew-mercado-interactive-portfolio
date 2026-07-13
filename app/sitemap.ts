import type { MetadataRoute } from "next";
import { projectIds } from "@/content/portfolio";
import { getBaseUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl().origin;
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectIds.map((id) => ({
      url: `${baseUrl}/projects/${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority:
        id === "waiver-director" || id === "escape-director" ? 0.85 : 0.7,
    })),
  ];
}
