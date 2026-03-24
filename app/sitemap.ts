import type { MetadataRoute } from 'next';
import { projectIds } from '@/content/portfolio';
import { getBaseUrl } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl().origin;
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hub`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectIds.map((id) => ({
      url: `${baseUrl}/projects/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: id === 'contact' ? 0.8 : 0.7,
    })),
  ];
}
