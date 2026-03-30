import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/puzzles/",
      },
    ],
    sitemap: `${baseUrl.origin}/sitemap.xml`,
    host: baseUrl.origin,
  };
}
