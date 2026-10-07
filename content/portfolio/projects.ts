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
      "Case study for Escape Director, an escape-room operations platform with trusted live-game controls, resilient backend systems, evidence-backed analytics, and an AI assistant for exploring performance data.",
    hubSubtitle: "SAAS PLATFORM",
    icon: Cpu,
    level: 0,
    puzzleType: null,
    tag: "ACTIVE",
    status: "ACTIVE",
    role: "Founder & Lead Software Engineer",
    timeline: "2021 - Present",
    stack: [
      "TanStack Start",
      "React",
      "Express 5",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Railway",
      "Better Auth",
      "AWS S3",
    ],
    overview:
      "A SaaS operations platform for escape room owners and game masters. Battle-tested across 8,000+ Room Sessions with 99.95% uptime, unlimited Rooms per location, and offline-ready Room Stations built for the realities of venue Wi-Fi.",
    liveUrl: "https://www.escapedirector.com/",
    docsUrl: "https://docs.escapedirector.com/",
    color: "neon-blue",
    seoKeywords: [
      "SaaS dashboard",
      "escape room analytics",
      "offline-first PWA",
    ],
    screenshots: [
      "/screenshots/staging-escapedirector-com.png",
      "/screenshots/escape-director-room-dashboard.jpg",
      "/screenshots/escape-director-rooms-overview.jpg",
      "/screenshots/escape-director-analytics-ai.jpg",
    ],
    screenshotDetails: [
      {
        label: "Escape Director",
        description:
          "The public product experience introduces the platform before the case study moves into the operational interface.",
      },
      {
        label: "Live Game Master workspace",
        description:
          "The operational center for running the timer, tracking ordered Puzzles, sending Clues and media, and monitoring the player-facing Live View.",
      },
      {
        label: "Rooms at a glance",
        description:
          "Owners can manage multiple Rooms from one browser application while keeping each Room's duration, Clue allowance, content, and live state distinct.",
      },
      {
        label: "Evidence-backed analytics and AI",
        description:
          "The current Room Summary stays visible beside Ask Analytics, helping operators investigate performance with suggested reviews, explicit scope, and the numbers behind each answer.",
      },
    ],
    sections: [
      {
        icon: Monitor,
        title: "Gamemaster Dashboard",
        content:
          "Built for speed under pressure. Game masters control the timer, ordered puzzles and clues, audio, images, video, and the synchronized player-facing Live View from one workspace. Every action is timestamped in the Room Session log for later review.",
      },
      {
        icon: Server,
        title: "Platform Architecture",
        content:
          "TanStack Start and React power the frontend, backed by an Express 5 API and PostgreSQL with Prisma on Railway. Better Auth handles subscription-based access control, Stripe powers billing, and AWS S3 stores room media.",
      },
      {
        icon: Wifi,
        title: "Offline-First PWA",
        content:
          "Opening a Room online atomically prepares its current Room Revision, Application Shell, signed Offline Access Grant, and every configured audio, image, and video file. Once marked Offline ready, the Room Dashboard and same-station Live View can keep running for at least 24 hours; completed Room Sessions are saved locally and sync after reconnecting.",
      },
      {
        icon: BarChart3,
        title: "Room Analytics",
        content:
          "Evidence-backed analytics turn each completed Room Session into Room-scoped performance views, with clear coverage and supporting numbers behind every result. PostgreSQL rollups power summaries by Room and date range, while detailed logs preserve success, timing, attendance, clue usage, notes, and the story of each game.",
      },
      {
        icon: BrainCircuit,
        title: "Analytics AI Assistant",
        content:
          "Ask Analytics helps operators explore performance in plain language. It translates each question into approved, read-only metric queries while keeping Room scope, metric definitions, and supporting evidence intact.",
      },
    ],
  },
  {
    id: "waiver-director",
    title: "Waiver Director",
    seoTitle: "Waiver Director",
    seoDescription:
      "Case study for Waiver Director, a multi-tenant waiver operations platform built with SvelteKit and Convex for signed records, bookings, follow-ups, and analytics.",
    hubSubtitle: "SAAS PLATFORM",
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
      "An open source multi-tenant SaaS for waiver operations: build and publish versioned waivers, collect immutable signed submissions, connect booking data, automate follow-ups, and understand completion and customer activity from one workspace-scoped system.",
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
      "Convex",
      "Resend",
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
          "The venue's custom waiver workflow runs through Waiver Director, the multi-tenant product I founded and lead specifically for this venue. It connects signing and booking context with operational follow-ups while preserving an exact record of every completed waiver.",
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
      "Case study for Level Up VR, a ground-up website designed in Figma, built in Webflow, and enhanced with custom JavaScript interactions.",
    hubSubtitle: "DESIGN & FRONTEND",
    icon: Terminal,
    level: 2,
    puzzleType: "network",
    tag: "DEPLOYED",
    status: "DEPLOYED",
    role: "Designer & Web Developer",
    timeline: "2023 - Present",
    stack: ["Figma", "Webflow", "HTML", "CSS", "Vanilla JS", "Resova"],
    overview:
      "Designed from the ground up in Figma and built in Webflow, this custom site used the platform to accelerate development without compromising the venue's visual identity. Select interactions were extended with vanilla JavaScript, and the finished site reached the #1 local SEO position for VR in Frederick.",
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
        title: "Designed from a Blank Canvas",
        content:
          "Every page, visual system, and interaction began as an original design. Figma made it possible to iterate quickly on layout, typography, and motion before translating the final direction into a fully custom Webflow build - no prebuilt theme or recycled site structure.",
        span: "full",
      },
      {
        icon: Activity,
        title: "Webflow, Extended with Code",
        content:
          "Webflow accelerated responsive development and handled the site's core layout and presentation. Vanilla JavaScript was added selectively for animations and interactions that needed more custom behavior, keeping code focused where it created a meaningful difference.",
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
      "Case study for Matthew Mercado’s ground-up escape room design and puzzle engineering, combining custom electronics with Raspberry Pi-driven media interactions.",
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
      "End-to-end room and puzzle systems for award-winning escape room experiences - each room designed from scratch, with custom electronics and software translating layered physical actions into responsive media and environmental effects.",
    color: "error-red",
    seoKeywords: [
      "Arduino",
      "Raspberry Pi",
      "embedded systems",
      "physical computing",
    ],
    sections: [
      {
        icon: Layers,
        title: "Original Room & Puzzle Design",
        content:
          "Each room starts as an original experience, from the player journey and environmental storytelling to the sequence of physical interactions and final solution. Proven components can be reused where they make sense, but every puzzle is adapted and integrated into a unique solution for its room.",
        span: "full",
      },
      {
        icon: Code2,
        title: "Physical-to-Digital Interactions",
        content:
          "Raspberry Pi systems connect complex physical interactions to digital media. They can evaluate a sequence of sensor-driven actions and activate video, audio, lighting, or other effects at precisely the right moment in the experience.",
      },
      {
        icon: Cpu,
        title: "Custom Electronics",
        content:
          "Arduino circuits, PLC logic, sensors, electromagnets, servos, and lighting controls turn the room design into a working physical system. Hardware and software are developed together so each interaction feels immediate and invisible to the player.",
      },
      {
        icon: Shield,
        title: "Built for Live Operation",
        content:
          "The finished systems are designed for repeatable resets, practical maintenance, and operator control during a live game. Serviceable components and intentional recovery paths help protect the guest experience without flattening the puzzle into a generic template.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio",
    hubTitle: "Portfolio Experience",
    seoTitle: "Interactive Portfolio Experience",
    seoDescription:
      "Case study for this interactive portfolio: an escape-room camera-feed hero with a UV flashlight that reveals real project results, light and dark themes, and practical case-study storytelling.",
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
      "Motion",
      "CSS masks",
      "CSS",
    ],
    overview:
      "The portfolio you are navigating right now - it opens on a game master's camera feed of an escape room, hands you a UV flashlight to find the proof written on the wall, then gets out of the way so the work and case studies stay easy to reach.",
    color: "neon-blue",
    seoKeywords: [
      "interactive portfolio",
      "creative development",
      "motion design",
    ],
    sections: [
      {
        icon: Layers,
        title: "A Room You Can Search",
        content:
          "The hero borrows from the escape rooms behind much of the work: a CAM 01 feed, a session clock, and a floor plan with six real results hidden in UV ink. Find them all and the room clears, but every result is also listed for screen readers and in the case files below, so nobody has to play to learn what was built.",
        span: "full",
      },
      {
        icon: Activity,
        title: "A Flashlight Without Re-renders",
        content:
          "The light position is written straight to CSS custom properties on each pointer move or animation frame, and a radial mask reveals the UV layer, so React only re-renders when a clue is found. On touch screens the light sweeps the wall on its own.",
      },
      {
        icon: Server,
        title: "Architecture",
        content:
          "Next.js 16 and React 19 provide the application shell and statically generated project routes. Motion handles entrances and transitions, design tokens drive matching light and dark themes with no flash on load, and strict TypeScript keeps the content and presentation model coherent.",
      },
      {
        icon: Monitor,
        title: "Practical by Default",
        content:
          "The playful opening leads into conventional case files, capabilities, about, experience, and contact sections. With reduced motion the lights simply stay on, and the theme follows the system setting until a visitor picks one.",
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
