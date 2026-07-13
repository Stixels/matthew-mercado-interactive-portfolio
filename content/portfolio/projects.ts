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
} from "lucide-react";

import type { PortfolioProject } from "./types";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "escape-director",
    title: "Escape Director",
    seoTitle: "Escape Director",
    seoDescription:
      "Case study for Escape Director, a SaaS gamemaster dashboard and analytics platform built for escape room operators with offline-first reliability.",
    hubSubtitle: "SAAS PLATFORM",
    icon: Cpu,
    level: 0,
    puzzleType: null,
    tag: "ACTIVE",
    status: "ACTIVE",
    role: "Founder & Lead Software Engineer",
    timeline: "2023 - Present",
    stack: [
      "Next.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Railway",
      "BetterAuth",
      "MongoDB",
      "MCP",
    ],
    overview:
      "A SaaS gamemaster dashboard and analytics platform for escape room operators - the most intuitive tool in the industry. Manages 6,000+ rooms globally with 99.99% uptime and an offline-first architecture built for the realities of venue Wi-Fi.",
    liveUrl: "https://staging.escapedirector.com/",
    color: "neon-blue",
    seoKeywords: [
      "SaaS dashboard",
      "escape room analytics",
      "offline-first PWA",
    ],
    screenshots: [
      "/screenshots/staging-escapedirector-com.png",
      "/screenshots/ed-dashboard.webp",
      "/screenshots/ed-room-statistics.webp",
    ],
    screenshotDetails: [
      {
        label: "Escape room operations",
        description:
          "A purpose-built platform for running live escape rooms and understanding every game after it ends.",
      },
      {
        label: "Live gamemaster dashboard",
        description:
          "The control room operators use throughout a game to follow player progress, manage puzzles and time, and send clues through text, images, video, or audio.",
      },
      {
        label: "Room and game statistics",
        description:
          "Every escape room run becomes a searchable record of performance statistics, clue usage, event logs, and gamemaster notes for later review.",
      },
    ],
    sections: [
      {
        icon: Monitor,
        title: "Gamemaster Dashboard",
        content:
          "Built for speed under pressure. Clue delivery, puzzle tracking, countdown management, and room-specific effects - all from a single distraction-free interface. The learning curve is minutes, not days. Every interaction was designed around the split-second reality of a live session.",
      },
      {
        icon: Server,
        title: "Platform Architecture",
        content:
          "Next.js frontend, Express API, PostgreSQL on Railway. Better Auth handles subscription-based access control and Stripe powers billing. The full stack was chosen for reliability and minimal operational overhead.",
      },
      {
        icon: Wifi,
        title: "Offline-First PWA",
        content:
          "A service worker caches 24 hours of session data locally. Gamemasters run live rooms through complete Wi-Fi outages - the app never goes blank. Data syncs silently in the background the moment connectivity returns.",
      },
      {
        icon: BarChart3,
        title: "Room Analytics",
        content:
          "Per-room stats: success rates, average completion times, clue usage patterns, and session logs filterable by date, staff, and group size. Operators identify bottleneck puzzles and coaching opportunities without leaving the dashboard.",
      },
      {
        icon: Code2,
        title: "MCP-Powered Integrations",
        content:
          "Built MCP servers that expose external API capabilities through one chat interface. Operators can find information and take actions across connected systems without learning each provider's separate workflow.",
      },
    ],
  },
  {
    id: "waiver-director",
    title: "Waiver Director",
    seoTitle: "Waiver Director",
    seoDescription:
      "Case study for Waiver Director, a multi-tenant waiver operations platform built with SvelteKit and Convex for signed records, bookings, follow-ups, and analytics.",
    hubSubtitle: "PRODUCT ENGINEERING",
    icon: Shield,
    level: 0,
    puzzleType: null,
    tag: "ACTIVE",
    status: "ACTIVE",
    role: "Founder & Lead Software Engineer",
    timeline: "2026 - Present",
    stack: [
      "SvelteKit",
      "Svelte 5",
      "Convex",
      "Clerk",
      "TypeScript",
      "Resend",
      "Tailwind CSS",
      "Agentic APIs",
    ],
    overview:
      "A multi-tenant SaaS for waiver operations: build and publish versioned waivers, collect immutable signed submissions, connect booking data, automate follow-ups, and understand completion and customer activity from one workspace-scoped system.",
    liveUrl: "https://www.waiverdirector.com/",
    color: "neon-purple",
    seoKeywords: [
      "waiver management SaaS",
      "multi-tenant application",
      "SvelteKit Convex",
      "workflow automation",
    ],
    screenshots: [
      "/screenshots/waiver-director.png",
      "/screenshots/waiver-director-ai-audit.png",
      "/screenshots/waiver-director-authoring.png",
      "/screenshots/waiver-director-integrations.png",
    ],
    screenshotDetails: [
      {
        label: "Workspace overview",
        description:
          "One operational view for bookings, signed records, follow-ups, and workspace activity.",
      },
      {
        label: "AI review, human decision",
        description:
          "The audit turns a template into a scored critique, specific suggestions, and a reviewable diff before an operator applies anything.",
      },
      {
        label: "Waiver authoring",
        description:
          "Operators compose the waiver, add structured questions, preview signer details, and publish from one focused workspace.",
      },
      {
        label: "Consent-driven integrations",
        description:
          "Provider setup explains the handoff before authorization and keeps opted-in signer data tied to an explicitly selected audience.",
      },
    ],
    sections: [
      {
        icon: Shield,
        title: "Signed-record integrity",
        content:
          "Published waiver versions are frozen and every signed submission keeps the exact signer details, answers, signature, minors, and booking context captured at signing time. Operational notes and later provider changes stay outside the legal record.",
      },
      {
        icon: Layers,
        title: "Workspace-safe architecture",
        content:
          "Designed the product around strict workspace isolation with server-side authorization in Convex. Owners and staff get purposeful permissions while stable workspace handles keep routing clear without inventing a parent-organization model the domain does not need.",
      },
      {
        icon: Activity,
        title: "Operational workflows",
        content:
          "Booking-linked and public signing flows feed customer, submission, and session views. Follow-ups can be queued, scheduled, canceled, or sent manually while analytics surface completion gaps, booking volume, customer activity, and email performance.",
      },
      {
        icon: BrainCircuit,
        title: "Agentic Content Audits",
        content:
          "Built agentic API workflows where an LLM audits operator-written emails and waiver templates, then returns structured, actionable feedback. The system accelerates review while keeping the operator responsible for the final language.",
      },
      {
        icon: Zap,
        title: "Integration design",
        content:
          "Bookeo supplies booking context while Mailchimp and Constant Contact flows keep marketing consent explicit. OAuth callbacks return operators to the exact audience-selection step so setup can be completed without losing context.",
      },
    ],
  },
  {
    id: "escape-this-frederick",
    title: "Escape This Frederick",
    seoTitle: "Escape This Frederick",
    seoDescription:
      "Case study for Escape This Frederick, a conversion-focused website rebuild that improved Lighthouse performance, doubled conversion rate, and strengthened local SEO.",
    hubSubtitle: "WEB ENGINEERING",
    icon: Database,
    level: 1,
    puzzleType: "auth",
    tag: "DEPLOYED",
    status: "DEPLOYED",
    role: "Web Developer & Product Lead",
    timeline: "2022 - Present",
    stack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Bookeo API",
      "Mailchimp",
      "Vercel",
      "WordPress",
    ],
    overview:
      "A complete digital overhaul of Maryland's highest-rated escape room. Rebuilt from a 52 Lighthouse score to 97, doubled the conversion rate from 2.5% to 5%, and secured the #1 local SEO position statewide.",
    liveUrl: "https://escapethisfrederick.com/",
    color: "neon-purple",
    seoKeywords: ["local SEO", "conversion optimization", "booking flow"],
    screenshots: ["/screenshots/escapethisfrederick-com.png"],
    sections: [
      {
        icon: Zap,
        title: "Performance Overhaul",
        content:
          "Rebuilt from scratch with modern architecture - Lighthouse jumped from 52 to 97. Improved Core Web Vitals drove a 35% reduction in bounce rate and cemented the #1 local SEO position statewide.",
      },
      {
        icon: TrendingUp,
        title: "Conversion Engineering",
        content:
          "Conversion rate doubled from 2.5% to 5% through a redesigned booking flow, stronger visual room storytelling, and clearer CTAs. Every change was backed by session data, not guesswork.",
      },
      {
        icon: Database,
        title: "Waiver Director",
        content:
          "The venue's custom waiver workflow runs through Waiver Director, the multi-tenant product I founded and lead. It connects signing and booking context with operational follow-ups while preserving an exact record of every completed waiver.",
      },
      {
        icon: Wrench,
        title: "Puzzle Engineering",
        content:
          "Beyond the web stack - designed and wired custom Arduino circuits and PLC logic for several of the venue's award-winning physical rooms. Software and hardware working as a unified system.",
      },
    ],
  },
  {
    id: "level-up-vr",
    title: "Level Up VR",
    seoTitle: "Level Up VR",
    seoDescription:
      "Case study for Level Up VR, a custom marketing site with hand-built motion design, strong local SEO performance, and a streamlined booking experience.",
    hubSubtitle: "DESIGN & FRONTEND",
    icon: Terminal,
    level: 2,
    puzzleType: "network",
    tag: "DEPLOYED",
    status: "DEPLOYED",
    role: "Designer & Frontend Engineer",
    timeline: "2023 - Present",
    stack: [
      "HTML",
      "CSS",
      "Vanilla JS",
      "Resova",
      "Custom Animations",
      "Webflow",
    ],
    overview:
      "Designed and built from scratch - a fully custom web presence for a location-based VR venue that claimed the #1 local SEO rank for VR in Frederick on day one, outperforming established competitors.",
    liveUrl: "https://www.lvlupvr.com/",
    color: "neon-green",
    seoKeywords: ["motion design", "marketing website", "VR venue website"],
    screenshots: [
      "/screenshots/lvlupvr-home.png",
      "/screenshots/lvlupvr-games-carousels.png",
    ],
    sections: [
      {
        icon: Layers,
        title: "Ground-Up Design & Build",
        content:
          "No templates. No CMS. No hand-offs. Every screen designed from scratch with layered visual depth, bold typographic hierarchy, and motion that mirrors the immersive nature of the physical venue. The site had to feel as premium as the experience it was selling.",
        span: "full",
      },
      {
        icon: Activity,
        title: "Custom Motion",
        content:
          "Every animation hand-coded in vanilla JavaScript - no library dependencies. Scroll-driven parallax, staggered reveals, and hover interactions, each tuned to the brand. Zero third-party overhead means nothing can drift or break the aesthetic.",
      },
      {
        icon: TrendingUp,
        title: "Results",
        content:
          "Number one local SEO for VR in Frederick on launch. Resova booking widget embedded and restyled to eliminate friction between discovery and reservation. Game catalog scales as the venue adds new titles - no developer involvement required.",
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Puzzle Engineering",
    hubTitle: "Hardware Systems",
    seoTitle: "Hardware and Puzzle Engineering",
    seoDescription:
      "Case study for Matthew Mercado’s hardware and puzzle engineering work, combining Arduino circuits, Raspberry Pi control systems, and fail-safe live experience design.",
    hubSubtitle: "PHYSICAL SYSTEMS",
    icon: ShieldAlert,
    level: 3,
    puzzleType: "frequency",
    tag: "RESTRICTED",
    status: "RESTRICTED",
    role: "Puzzle Engineer & Hardware Developer",
    timeline: "2020 - Present",
    stack: ["Arduino", "Raspberry Pi", "C++", "Python", "PLCs"],
    overview:
      "The physical layer behind award-winning escape room experiences - custom Arduino circuits, PLC logic, and multi-stage puzzle sequences that bridge software and hardware into seamless live games.",
    color: "error-red",
    seoKeywords: [
      "Arduino",
      "Raspberry Pi",
      "embedded systems",
      "physical computing",
    ],
    sections: [
      {
        icon: Cpu,
        title: "Circuit Design",
        content:
          "Custom Arduino circuits for multi-stage puzzle sequences - reed switches, electromagnets, servos, and custom lighting rigs. Every puzzle is built as a discrete, modular unit. Faulty components can be swapped on-site in minutes without tearing down the room.",
      },
      {
        icon: Code2,
        title: "Control Architecture",
        content:
          "Raspberry Pi units serve as local control nodes, running Python services that manage room state and sync with the Escape Director platform over the local network. Physical puzzle events trigger digital responses in real time.",
      },
      {
        icon: Shield,
        title: "Fail-Safe Design",
        content:
          "Hardware downtime in a live show is unacceptable. Every circuit includes failover paths, watchdog timers, and manual overrides. A single component failure cannot kill a session - the show goes on.",
      },
      {
        icon: Activity,
        title: "Scale",
        content:
          "Modular puzzle architecture means new rooms are built by adapting proven circuit templates rather than redesigning from scratch. Each build compounds the reliability of the last. No room gets a one-off design.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio",
    hubTitle: "Portfolio Experience",
    seoTitle: "Interactive Portfolio Experience",
    seoDescription:
      "Case study for this responsive interactive portfolio, combining scroll-driven Three.js scenes, Motion choreography, React, and practical case-study storytelling.",
    hubSubtitle: "CREATIVE DEVELOPMENT",
    icon: BrainCircuit,
    level: 4,
    puzzleType: "matrix",
    tag: "EXPERIMENTAL",
    status: "EXPERIMENTAL",
    role: "Full-Stack Engineer & Designer",
    timeline: "2026 - Present",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "Motion",
      "CSS",
    ],
    overview:
      "The portfolio you are navigating right now - a clean, scroll-driven story that turns a full-stack application into an explorable 3D system, then gets out of the way so the work and case studies remain easy to reach.",
    color: "neon-blue",
    seoKeywords: [
      "interactive portfolio",
      "creative development",
      "motion design",
    ],
    sections: [
      {
        icon: Layers,
        title: "A System You Can Read",
        content:
          "The opening scene explains the work through a familiar application, then reveals its service layer, AI engine, and integrations in sequence. Each object has one purpose, and the editorial layout keeps project information available without making visitors solve a puzzle first.",
        span: "full",
      },
      {
        icon: Activity,
        title: "Responsive 3D Choreography",
        content:
          "React Three Fiber renders a procedural scene with no downloaded 3D assets. Motion tracks the document story while the scene uses staged reflows and reveals, keeping models separated on desktop and placing the visual in its own sticky band on mobile.",
      },
      {
        icon: Server,
        title: "Architecture",
        content:
          "Next.js 16 and React 19 provide the application shell and statically generated project routes. Three.js and React Three Fiber own the visual layer, Motion handles interface transitions, and strict TypeScript keeps the content and presentation model coherent.",
      },
      {
        icon: Monitor,
        title: "Practical by Default",
        content:
          "The experimental opening leads into conventional selected-work, about, experience, and contact sections. Reduced-motion preferences remove interpolation, case-study screenshots remain fully visible, and the experience adapts to touch screens without placing text over the 3D scene.",
      },
    ],
  },
  {
    id: "contact",
    title: "About Matthew",
    hubTitle: "About Matthew",
    seoTitle: "About Matthew Mercado",
    seoDescription:
      "Profile and contact page for Matthew Mercado, a full-stack engineer and designer focused on conversion-driven products, immersive interfaces, and hardware-linked experiences.",
    hubSubtitle: "ABOUT & CONTACT",
    icon: User,
    level: 0,
    puzzleType: null,
    tag: "VERIFIED",
    status: "VERIFIED",
    role: "Software Engineer & Designer",
    timeline: "LIFETIME",
    stack: ["Next.js", "TypeScript", "React", "Arduino", "Raspberry Pi"],
    overview:
      "Software engineer with a focus on frontend craft, UI/UX design, and immersive digital experiences. Builds products that run live escape rooms, move real conversion metrics, and wire up the physical puzzles inside the rooms.",
    color: "neon-green",
    seoKeywords: ["about Matthew Mercado", "contact Matthew Mercado"],
    screenshots: ["/matthew-headshot.png"],
  },
];

export const projectsById = Object.fromEntries(
  portfolioProjects.map((project) => [project.id, project]),
) as Record<(typeof portfolioProjects)[number]["id"], PortfolioProject>;

export const projectIds = portfolioProjects.map((project) => project.id);

export function getProjectById(id: string) {
  return portfolioProjects.find((project) => project.id === id) ?? null;
}
