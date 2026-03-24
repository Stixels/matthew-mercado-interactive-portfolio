import {
  Activity,
  BarChart3,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Layers,
  Monitor,
  Server,
  Shield,
  ShieldAlert,
  Terminal,
  TrendingUp,
  User,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-react';

import type { PortfolioProject } from './types';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'core',
    title: 'Escape Director',
    seoTitle: 'Escape Director',
    seoDescription:
      'Case study for Escape Director, a SaaS gamemaster dashboard and analytics platform built for escape room operators with offline-first reliability.',
    hubSubtitle: 'SAAS PLATFORM',
    icon: Cpu,
    level: 0,
    puzzleType: null,
    tag: 'ACTIVE',
    status: 'ACTIVE',
    role: 'Founder & Full-Stack Engineer',
    timeline: '2023 - Present',
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Prisma', 'Stripe', 'Railway', 'BetterAuth', 'MongoDB'],
    overview:
      'A SaaS gamemaster dashboard and analytics platform for escape room operators - the most intuitive tool in the industry. Manages 6,000+ rooms globally with 99.99% uptime and an offline-first architecture built for the realities of venue Wi-Fi.',
    color: 'neon-blue',
    seoKeywords: ['SaaS dashboard', 'escape room analytics', 'offline-first PWA'],
    sections: [
      {
        icon: Monitor,
        title: 'Gamemaster Dashboard',
        content:
          'Built for speed under pressure. Clue delivery, puzzle tracking, countdown management, and room-specific effects - all from a single distraction-free interface. The learning curve is minutes, not days. Every interaction was designed around the split-second reality of a live session.',
      },
      {
        icon: Server,
        title: 'Platform Architecture',
        content:
          'Next.js frontend, Express API, PostgreSQL on Railway. Better Auth handles subscription-based access control and Stripe powers billing. The full stack was chosen for reliability and minimal operational overhead.',
      },
      {
        icon: Wifi,
        title: 'Offline-First PWA',
        content:
          'A service worker caches 24 hours of session data locally. Gamemasters run live rooms through complete Wi-Fi outages - the app never goes blank. Data syncs silently in the background the moment connectivity returns.',
      },
      {
        icon: BarChart3,
        title: 'Room Analytics',
        content:
          'Per-room stats: success rates, average completion times, clue usage patterns, and session logs filterable by date, staff, and group size. Operators identify bottleneck puzzles and coaching opportunities without leaving the dashboard.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Escape This Frederick',
    seoTitle: 'Escape This Frederick',
    seoDescription:
      'Case study for Escape This Frederick, a conversion-focused website rebuild that improved Lighthouse performance, doubled conversion rate, and strengthened local SEO.',
    hubSubtitle: 'WEB ENGINEERING',
    icon: Database,
    level: 1,
    puzzleType: 'auth',
    tag: 'DEPLOYED',
    status: 'DEPLOYED',
    role: 'Web Developer & Product Lead',
    timeline: '2022 - Present',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Bookeo API', 'Mailchimp', 'Vercel', 'WordPress'],
    overview:
      "A complete digital overhaul of Maryland's highest-rated escape room. Rebuilt from a 52 Lighthouse score to 97, doubled the conversion rate from 2.5% to 5%, and secured the #1 local SEO position statewide.",
    color: 'neon-purple',
    seoKeywords: ['local SEO', 'conversion optimization', 'booking flow'],
    sections: [
      {
        icon: Zap,
        title: 'Performance Overhaul',
        content:
          'Rebuilt from scratch with modern architecture - Lighthouse jumped from 52 to 97. Improved Core Web Vitals drove a 35% reduction in bounce rate and cemented the #1 local SEO position statewide.',
      },
      {
        icon: TrendingUp,
        title: 'Conversion Engineering',
        content:
          'Conversion rate doubled from 2.5% to 5% through a redesigned booking flow, stronger visual room storytelling, and clearer CTAs. Every change was backed by session data, not guesswork.',
      },
      {
        icon: Database,
        title: 'Custom Waiver System',
        content:
          'Full-stack waiver app on Next.js, Prisma, and PostgreSQL - integrated with Bookeo for booking data and Mailchimp for automated campaigns. Owning the pipeline increased remarketing capacity 8x.',
      },
      {
        icon: Wrench,
        title: 'Puzzle Engineering',
        content:
          "Beyond the web stack - designed and wired custom Arduino circuits and PLC logic for several of the venue's award-winning physical rooms. Software and hardware working as a unified system.",
      },
    ],
  },
  {
    id: 'terminal',
    title: 'Level Up VR',
    seoTitle: 'Level Up VR',
    seoDescription:
      'Case study for Level Up VR, a custom marketing site with hand-built motion design, strong local SEO performance, and a streamlined booking experience.',
    hubSubtitle: 'DESIGN & FRONTEND',
    icon: Terminal,
    level: 2,
    puzzleType: 'network',
    tag: 'DEPLOYED',
    status: 'DEPLOYED',
    role: 'Designer & Frontend Engineer',
    timeline: '2023 - Present',
    stack: ['HTML', 'CSS', 'Vanilla JS', 'Resova', 'Custom Animations', 'Webflow'],
    overview:
      'Designed and built from scratch - a fully custom web presence for a location-based VR venue that claimed the #1 local SEO rank for VR in Frederick on day one, outperforming established competitors.',
    color: 'neon-green',
    seoKeywords: ['motion design', 'marketing website', 'VR venue website'],
    sections: [
      {
        icon: Layers,
        title: 'Ground-Up Design & Build',
        content:
          'No templates. No CMS. No hand-offs. Every screen designed from scratch with layered visual depth, bold typographic hierarchy, and motion that mirrors the immersive nature of the physical venue. The site had to feel as premium as the experience it was selling.',
        span: 'full',
      },
      {
        icon: Activity,
        title: 'Custom Motion',
        content:
          'Every animation hand-coded in vanilla JavaScript - no library dependencies. Scroll-driven parallax, staggered reveals, and hover interactions, each tuned to the brand. Zero third-party overhead means nothing can drift or break the aesthetic.',
      },
      {
        icon: TrendingUp,
        title: 'Results',
        content:
          'Number one local SEO for VR in Frederick on launch. Resova booking widget embedded and restyled to eliminate friction between discovery and reservation. Game catalog scales as the venue adds new titles - no developer involvement required.',
      },
    ],
  },
  {
    id: 'security',
    title: 'Hardware & Puzzle Engineering',
    hubTitle: 'Hardware Systems',
    seoTitle: 'Hardware and Puzzle Engineering',
    seoDescription:
      'Case study for Matthew Mercado’s hardware and puzzle engineering work, combining Arduino circuits, Raspberry Pi control systems, and fail-safe live experience design.',
    hubSubtitle: 'PHYSICAL SYSTEMS',
    icon: ShieldAlert,
    level: 3,
    puzzleType: 'frequency',
    tag: 'RESTRICTED',
    status: 'RESTRICTED',
    role: 'Puzzle Engineer & Hardware Developer',
    timeline: '2020 - Present',
    stack: ['Arduino', 'Raspberry Pi', 'C++', 'Python', 'PLCs'],
    overview:
      'The physical layer behind award-winning escape room experiences - custom Arduino circuits, PLC logic, and multi-stage puzzle sequences that bridge software and hardware into seamless live games.',
    color: 'error-red',
    seoKeywords: ['Arduino', 'Raspberry Pi', 'embedded systems', 'physical computing'],
    sections: [
      {
        icon: Cpu,
        title: 'Circuit Design',
        content:
          'Custom Arduino circuits for multi-stage puzzle sequences - reed switches, electromagnets, servos, and custom lighting rigs. Every puzzle is built as a discrete, modular unit. Faulty components can be swapped on-site in minutes without tearing down the room.',
      },
      {
        icon: Code2,
        title: 'Control Architecture',
        content:
          'Raspberry Pi units serve as local control nodes, running Python services that manage room state and sync with the Escape Director platform over the local network. Physical puzzle events trigger digital responses in real time.',
      },
      {
        icon: Shield,
        title: 'Fail-Safe Design',
        content:
          'Hardware downtime in a live show is unacceptable. Every circuit includes failover paths, watchdog timers, and manual overrides. A single component failure cannot kill a session - the show goes on.',
      },
      {
        icon: Activity,
        title: 'Scale',
        content:
          'Modular puzzle architecture means new rooms are built by adapting proven circuit templates rather than redesigning from scratch. Each build compounds the reliability of the last. No room gets a one-off design.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'Interactive Portfolio',
    hubTitle: 'Portfolio Experience',
    seoTitle: 'Interactive Portfolio Experience',
    seoDescription:
      'Case study for this interactive portfolio, combining immersive UI design, motion systems, Next.js architecture, and puzzle-based storytelling.',
    hubSubtitle: 'CREATIVE DEVELOPMENT',
    icon: BrainCircuit,
    level: 4,
    puzzleType: 'matrix',
    tag: 'EXPERIMENTAL',
    status: 'EXPERIMENTAL',
    role: 'Full-Stack Engineer & Designer',
    timeline: '2025 - Present',
    stack: ['Next.js 16', 'TypeScript', 'Motion', 'Zustand', 'Tailwind CSS v4'],
    overview:
      'The portfolio you are navigating right now - an escape-room-themed interface where puzzles gate access to project details. The site demonstrates the work by being the work.',
    color: 'neon-blue',
    seoKeywords: ['interactive portfolio', 'creative development', 'motion design'],
    sections: [
      {
        icon: Layers,
        title: 'Concept & Design',
        content:
          'An escape-room-themed interface where puzzles gate access to project details. Visitors become participants instead of passive readers. The friction is intentional - the metaphor is the UX, not a limitation of it.',
        span: 'full',
      },
      {
        icon: Activity,
        title: 'Animation System',
        content:
          'Motion drives transitions and puzzle interactions. CRT scanlines, circuit grid, glitch effects, and the scan beam are custom CSS - mostly GPU-accelerated transforms with minimal JS.',
      },
      {
        icon: Server,
        title: 'Architecture',
        content:
          'Next.js 16 App Router with Turbopack for dev and production builds, React 19, and strict TypeScript. Zustand holds the unlock graph across boot, puzzles, and module access. Tailwind CSS v4 with @theme tokens. Core routes are statically generated and typechecked at build time.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'About Matthew',
    hubTitle: 'About Matthew',
    seoTitle: 'About Matthew Mercado',
    seoDescription:
      'Profile and contact page for Matthew Mercado, a full-stack engineer and designer focused on conversion-driven products, immersive interfaces, and hardware-linked experiences.',
    hubSubtitle: 'ABOUT & CONTACT',
    icon: User,
    level: 0,
    puzzleType: null,
    tag: 'VERIFIED',
    status: 'VERIFIED',
    role: 'Full-Stack Engineer & Designer',
    timeline: 'LIFETIME',
    stack: ['Next.js', 'TypeScript', 'React', 'Arduino', 'Raspberry Pi'],
    overview:
      'Full-stack engineer with a focus on frontend craft, UI/UX design, and immersive digital experiences. Builds products that run live escape rooms, move real conversion metrics, and wire up the physical puzzles inside the rooms.',
    color: 'neon-green',
    seoKeywords: ['about Matthew Mercado', 'contact Matthew Mercado'],
  },
];

export const projectsById = Object.fromEntries(
  portfolioProjects.map((project) => [project.id, project])
) as Record<(typeof portfolioProjects)[number]['id'], PortfolioProject>;

export const projectIds = portfolioProjects.map((project) => project.id);

export function getProjectById(id: string) {
  return portfolioProjects.find((project) => project.id === id) ?? null;
}
