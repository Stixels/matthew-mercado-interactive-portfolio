import type { Metadata } from 'next';
import SystemHub from '@/components/SystemHub';

import { buildMetadata } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Projects',
  description:
    'Browse Matthew Mercado project case studies across SaaS product engineering, conversion-focused marketing sites, immersive frontend work, and hardware-integrated systems.',
  path: '/hub',
  keywords: ['project portfolio', 'case studies', 'selected work'],
});

export default function HubPage() {
  return <SystemHub />;
}
