import type { PortfolioProject } from "./types";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "escape-director",
    title: "Escape Director",
    seoTitle: "Escape Director",
    seoDescription:
      "Case study for Escape Director, an escape-room operations SaaS with a live game master dashboard, offline-first rooms, an LLM analytics assistant chosen through a model evaluation harness, and an open-source Arduino device SDK.",
    hubSubtitle: "SAAS PLATFORM",
    status: "ACTIVE",
    role: "Founder & Lead Software Engineer",
    timeline: "2023 – Present",
    stack: [
      "TanStack Start",
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "IndexedDB",
      "Stripe",
      "Vercel AI Gateway",
    ],
    overview:
      "The operations platform I built and run for escape rooms. Game masters control the clock, clues, puzzles, media, and the players' screen from one dashboard, and the room keeps running when the venue's internet doesn't.",
    headings: {
      brief: "The problem at the desk",
      build: "Inside the platform",
      buildTitle: "Built for the countdown.",
      footage: "Live from the venue",
      footageTitle: "The game master's view.",
      stack: "Under the hood",
    },
    features: [
      {
        kind: "flow",
        label: "Outage drill",
        title: "What happens when the Wi-Fi drops.",
        intro:
          "Venue internet fails at the worst moments. The room is designed so players never notice.",
        steps: [
          {
            name: "Prepare",
            detail:
              "Opening a room caches its current revision, the app shell, a signed offline access grant, and every audio, image, and video file.",
          },
          {
            name: "Keep playing",
            detail:
              "The dashboard and the players' Live View keep the clock, clues, and media running from IndexedDB with no connection at all.",
          },
          {
            name: "Queue",
            detail:
              "Each finished game lands in a durable outbox with an idempotency key, so it survives a refresh or a reboot.",
          },
          {
            name: "Sync once",
            detail:
              "When the connection returns, the outbox drains. No game is lost, and none is counted twice.",
          },
        ],
      },
    ],
    challenge:
      "An escape room runs on a 60-minute clock with players inside who are counting on it. Most venues juggle a timer app, a clue screen, and paper notes, and a dropped Wi-Fi connection can stall a live game. I had run rooms since 2017, so I built the tool I wanted at the game master's desk.",
    metrics: [
      { value: "7,600+", label: "Live games run on the platform" },
      { value: "132,000+", label: "Game actions logged" },
      { value: "99.95%", label: "Uptime over the trailing 12 months" },
    ],
    outcomes: ["7,600+ live games", "99.95% uptime", "Offline-first rooms"],
    liveUrl: "https://www.escapedirector.com/",
    docsUrl: "https://docs.escapedirector.com/",
    seoKeywords: [
      "escape room software",
      "offline-first web app",
      "LLM analytics assistant",
      "LLM evaluation",
      "Arduino SDK",
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
        description: "The public product site.",
      },
      {
        label: "The game master's desk",
        description:
          "The live dashboard: clock, ordered puzzles, clues, media, and a preview of what players see, with every action timestamped.",
      },
      {
        label: "Every room at a glance",
        description:
          "Owners run unlimited rooms from one browser app, each with its own duration, clue allowance, content, and live state.",
      },
      {
        label: "Ask Analytics",
        description:
          "Operators ask questions in plain language and get answers backed by the numbers, scoped to the room and dates they chose.",
      },
    ],
    sections: [
      {
        title: "One dashboard for the live game",
        content:
          "Game masters run the clock, ordered puzzles, clues, audio, images, video, and the synchronized player-facing Live View from one screen. Automations fire from solved puzzles, clock events, or a game master's command, and every action is timestamped in the session log for review afterward.",
      },
      {
        title: "An AI assistant that earned the job",
        content:
          "Ask Analytics answers business questions in plain language and reshapes an operator's dashboard through schema-validated tool calls. Before it shipped, I ran 4 candidate models through the real production tool flow, 3 rounds and 72 turns each, with trace grading and blinded review, and picked the winner on quality, latency, and cost.",
      },
      {
        title: "Props that talk to the game",
        content:
          "An open-source, MIT-licensed Arduino SDK gives physical props state, command, and completion APIs with automatic pairing and reconnection, so a solved puzzle shows up on the dashboard instantly.",
      },
    ],
  },
  {
    id: "ai-agent-platform",
    title: "Enterprise AI Agent Tooling",
    hubTitle: "AI Agent Tooling",
    seoTitle: "Enterprise AI Agent Tooling",
    seoDescription:
      "Case study for Matthew Mercado's AI agent work at the U.S. Department of Defense: production MCP servers for an agency-wide LLM platform, a research agent, an air-gapped IDE for AI coding agents, and agentic-engineering training.",
    hubSubtitle: "APPLIED AI",
    status: "ACTIVE",
    role: "AI Agents Software Engineer",
    timeline: "2026 – Present",
    stack: [
      "Python",
      "FastMCP",
      "Model Context Protocol",
      "TypeScript",
      "Electron",
      "Svelte",
    ],
    overview:
      "The tools behind an agency-wide LLM platform at the U.S. Department of Defense: MCP servers that let its assistant do real work, an air-gapped IDE for AI coding agents, and the skills and training that help teams build with them.",
    headings: {
      brief: "The mission",
      build: "The tool belt",
      buildTitle: "Giving an assistant real capabilities.",
      stack: "Built with",
      media: "Closed network",
    },
    challenge:
      "An enterprise AI assistant is only as useful as the tools it can call. Teams needed it to search internal knowledge, draw charts, and help write code, on a network with no internet access, where every tool had to be secure, reviewable, and easy for other teams to build on.",
    metrics: [
      { value: "3 of 4", label: "Production MCP servers on the platform" },
      { value: "1,000s", label: "Tool calls handled every month" },
      { value: "15", label: "Agent-tooling repositories I review" },
    ],
    outcomes: ["3 of 4 MCP servers", "Air-gapped agent IDE"],
    mediaNote:
      "This work runs on a closed network, so there are no screenshots.",
    seoKeywords: [
      "MCP servers",
      "FastMCP",
      "LLM agents",
      "AI developer tools",
      "Electron IDE",
    ],
    sections: [
      {
        title: "MCP servers in production",
        content:
          "I built 3 of the platform's 4 production MCP servers in Python with FastMCP, handling thousands of tool calls a month. They include a multi-step research agent that returns one cited answer from many sources, and schema-validated tools that turn plain English into charts and diagrams in seconds.",
      },
      {
        title: "An IDE for agents, fully offline",
        content:
          "I shipped an air-gapped Electron and TypeScript IDE for AI coding agents on Linux and Windows, with offline package mirrors, a model gateway, PKI authentication, and in-app updates. Dozens of employees were using it before it was ever advertised.",
      },
      {
        title: "Raising the bar across teams",
        content:
          "I own code review for the platform's 15 agent-tooling repositories, more than 20 merge requests a week, and wrote the agent skills and onboarding course teams use to build with AI.",
      },
    ],
  },
  {
    id: "waiver-director",
    title: "Waiver Director",
    seoTitle: "Waiver Director",
    seoDescription:
      "Case study for Waiver Director, a multi-tenant waiver and guest-CRM SaaS built with SvelteKit and Convex, with immutable signed records, booking integrations, automated follow-ups, and AI content review.",
    hubSubtitle: "SAAS PLATFORM",
    status: "ACTIVE",
    role: "Founder & Lead Software Engineer",
    timeline: "2026 – Present",
    stack: ["SvelteKit", "TypeScript", "Convex", "Clerk", "Stripe", "Resend"],
    overview:
      "A guest CRM that starts with the waiver. Experience businesses collect a signature from every participant before they arrive, not just the person who booked, and turn those signers into relationships they can follow up with.",
    headings: {
      brief: "Origin story",
      build: "Design decisions",
      buildTitle: "Safe for every business on it.",
      footage: "Product tour",
      footageTitle: "From signature to follow-up.",
      stack: "Stack",
    },
    features: [
      {
        kind: "flow",
        label: "Record lifecycle",
        title: "One signature, start to finish.",
        intro:
          "A waiver is a legal record first and a marketing relationship second. The system keeps the two apart.",
        steps: [
          {
            name: "Publish",
            detail:
              "The operator publishes a waiver, and that version locks so it can never change under a signature.",
          },
          {
            name: "Sign",
            detail:
              "Every participant signs from a link, QR code, embed, or kiosk, including minors, before they arrive.",
          },
          {
            name: "Freeze",
            detail:
              "The submission captures signer details, answers, signature, and booking context in an immutable audit trail.",
          },
          {
            name: "Follow up",
            detail:
              "Signers who opted in sync to Mailchimp, and scheduled emails bring them back for another visit.",
          },
        ],
      },
    ],
    challenge:
      "At Escape This Frederick, I built a waiver app that captured every guest for remarketing, and other venues wanted the same thing. Waiver Director rebuilds it as a multi-tenant product, where each business's legal records have to stay exact and isolated from every other business.",
    outcomes: ["Multi-tenant SaaS", "Immutable signed records"],
    liveUrl: "https://www.waiverdirector.com/",
    seoKeywords: [
      "waiver software",
      "guest CRM",
      "multi-tenant SaaS",
      "SvelteKit Convex",
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
          "Bookings, signed records, follow-ups, and workspace activity in one view.",
      },
      {
        label: "AI review, human decision",
        description:
          "The audit turns a template into a score, specific suggestions, and a reviewable diff before the operator applies anything.",
      },
      {
        label: "Waiver authoring",
        description:
          "Operators write the waiver, add structured questions, preview what signers see, and publish from one workspace.",
      },
      {
        label: "Integrations with consent built in",
        description:
          "Provider setup explains the handoff before authorization, and only opted-in signers sync to the audience the operator chose.",
      },
    ],
    sections: [
      {
        title: "Isolation by default",
        content:
          "Every query is scoped to a workspace and authorized on the server in Convex. Clerk handles sign-in, owners and staff get role-based access, and Stripe handles billing per workspace.",
      },
      {
        title: "AI review, human decision",
        content:
          "An LLM audits operator-written waivers and emails and returns structured feedback with a reviewable diff. It speeds up review, while the operator stays responsible for the final language.",
      },
    ],
  },
  {
    id: "escape-this-frederick",
    title: "Escape This Frederick",
    seoTitle: "Escape This Frederick",
    seoDescription:
      "Case study for Escape This Frederick: a website rebuild that took Lighthouse from 52 to 97 and doubled conversion, a custom waiver app, and Arduino and PLC puzzles that eliminated manual resets.",
    hubSubtitle: "WEB ENGINEERING",
    status: "DEPLOYED",
    role: "Software Engineer & Manager",
    timeline: "2017 – 2024",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Bookeo API",
      "Mailchimp",
      "Vercel",
    ],
    overview:
      "Seven years at Maryland's highest-rated escape room, where I ran games, rebuilt the website, wrote the waiver software, and wired the puzzles. It's where I learned to build for the people on both sides of the screen.",
    headings: {
      brief: "Where it started",
      build: "The overhaul",
      buildTitle: "How the numbers moved.",
      stack: "Built with",
    },
    features: [
      {
        kind: "compare",
        label: "Before and after",
        title: "What the rebuild changed.",
        rows: [
          { measure: "Lighthouse performance", before: "52", after: "97" },
          { measure: "Visitors who book", before: "2.5%", after: "5%" },
          { measure: "Bounce rate", before: "—", after: "35% lower" },
          {
            measure: "Guests on the marketing list",
            before: "Booker only",
            after: "Every player",
          },
          {
            measure: "Puzzle resets between games",
            before: "By hand",
            after: "Automatic",
          },
        ],
      },
    ],
    challenge:
      "The old site was slow and lost bookings. Lighthouse scored it 52, only 2.5% of visitors booked, and guest details lived only with whoever made the booking. In the rooms, puzzles had to be reset by hand between every game.",
    outcomes: ["2× conversion", "Lighthouse 52 → 97"],
    liveUrl: "https://escapethisfrederick.com/",
    seoKeywords: ["local SEO", "conversion optimization", "booking flow"],
    screenshots: ["/screenshots/escapethisfrederick-com.png"],
    sections: [
      {
        title: "Rebuilt around the booking",
        content:
          "I rebuilt the site from scratch on Next.js with a redesigned booking flow, stronger room storytelling, and clearer calls to action. Every change came from session data, and the site took the top local search spot in the state.",
      },
      {
        title: "A waiver app that captured every guest",
        content:
          "I wrote the venue's digital waiver application in Next.js, Prisma, and PostgreSQL, with Bookeo and Mailchimp integrations, so every player, not just the booker, joined the marketing list. It later became Waiver Director.",
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
    status: "DEPLOYED",
    role: "Designer & Web Developer",
    timeline: "2023",
    stack: ["Figma", "Webflow", "HTML", "CSS", "JavaScript", "Resova"],
    overview:
      "A website for a VR arcade, designed from a blank canvas in Figma and built in Webflow, with custom JavaScript where the platform stopped. It reached the top local search result for VR in Frederick.",
    headings: {
      brief: "The ask",
      footage: "Screens",
      footageTitle: "Every game, one tap away.",
      stack: "Tools",
    },
    features: [
      {
        kind: "flow",
        label: "Process",
        title: "From blank canvas to bookings.",
        steps: [
          {
            name: "Figma",
            detail:
              "An original visual system and every page, designed and iterated before any build work.",
          },
          {
            name: "Webflow",
            detail:
              "A responsive build with a CMS game catalog that staff can grow on their own.",
          },
          {
            name: "JavaScript",
            detail:
              "Custom interactions and animation only where the platform stopped short.",
          },
          {
            name: "Resova",
            detail:
              "A restyled booking widget, so browsing turns into a reservation without a jarring handoff.",
          },
        ],
      },
    ],
    challenge:
      "A new VR venue needed a site that felt as energetic as the games, that staff could update without a developer, and that moved visitors straight to booking.",
    metrics: [
      { value: "#1", label: "Local search for VR in Frederick" },
      { value: "0", label: "Developer hours to add a new game" },
    ],
    outcomes: ["#1 local search", "Figma to Webflow"],
    liveUrl: "https://www.lvlupvr.com/",
    seoKeywords: ["marketing website", "Webflow", "VR venue website"],
    screenshots: [
      "/screenshots/lvlupvr-home.png",
      "/screenshots/lvlupvr-games-carousels.png",
    ],
    screenshotDetails: [
      {
        label: "Home page",
        description: "The landing page, designed in Figma first.",
      },
      {
        label: "Game catalog",
        description:
          "Carousels driven by a CMS collection, so staff can add games themselves.",
      },
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Puzzle Engineering",
    hubTitle: "Hardware Systems",
    seoTitle: "Hardware and Puzzle Engineering",
    seoDescription:
      "Case study for Matthew Mercado's escape room puzzle engineering: Arduino, PLC, and Raspberry Pi systems, puzzles that reset themselves, and an open-source device SDK that connects props to live games.",
    hubSubtitle: "PHYSICAL SYSTEMS",
    status: "RESTRICTED",
    role: "Puzzle Engineer & Hardware Developer",
    timeline: "2017 – Present",
    stack: ["Arduino", "C++", "Raspberry Pi", "Python", "PLCs", "Sensors"],
    overview:
      "Puzzles and room systems for award-winning escape rooms, from the first sketch to the final relay. Custom electronics turn what players do with their hands into sound, video, light, and open doors.",
    headings: {
      brief: "Design constraints",
      stack: "Parts bin",
      media: "Classified by design",
    },
    features: [
      {
        kind: "flow",
        label: "Signal chain",
        title: "From a player's hands to the game master's screen.",
        steps: [
          {
            name: "Sense",
            detail:
              "Sensors, switches, and magnets pick up what players do with the props.",
          },
          {
            name: "Decide",
            detail:
              "Arduino or PLC logic checks the sequence and knows when a puzzle is truly solved.",
          },
          {
            name: "React",
            detail:
              "Raspberry Pi systems fire video, audio, light, or a lock release at the right moment.",
          },
          {
            name: "Report",
            detail:
              "The Escape Director device SDK sends state and completion to the live dashboard.",
          },
        ],
      },
    ],
    challenge:
      "Every room I design starts from scratch, and every puzzle has to feel like magic to players while staying dull to maintain: it resets itself between games, recovers if something goes wrong, and lets the game master see what's happening from the desk.",
    metrics: [
      { value: "0", label: "Manual resets needed between games" },
      { value: "MIT", label: "Open-source device SDK" },
    ],
    outcomes: ["Arduino · Pi · PLCs", "No manual resets"],
    mediaNote:
      "These systems live inside working rooms, so the details stay hidden to keep the puzzles fun.",
    seoKeywords: [
      "Arduino",
      "Raspberry Pi",
      "embedded systems",
      "escape room puzzles",
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
    status: "EXPERIMENTAL",
    role: "Full-Stack Engineer & Designer",
    timeline: "2026 – Present",
    stack: ["Next.js 16", "React 19", "TypeScript", "Motion", "CSS masks"],
    overview:
      "The site you're on. It opens on a game master's camera feed of an escape room, hands you a UV flashlight to find the proof written on the wall, then gets out of the way so the work is easy to read.",
    headings: {
      brief: "Why a room",
      build: "Behind the wall",
      buildTitle: "Playful up front, practical underneath.",
      stack: "Built with",
      media: "Live demo",
    },
    features: [
      {
        kind: "flow",
        label: "One frame of light",
        title: "How the flashlight works.",
        steps: [
          {
            name: "Pointer",
            detail:
              "A pointer move, or an animation frame of the automatic sweep on touch screens.",
          },
          {
            name: "CSS variables",
            detail:
              "The position is written straight to custom properties, skipping React entirely.",
          },
          {
            name: "Mask",
            detail:
              "A radial mask-image reveals the UV ink layer under the light.",
          },
          {
            name: "Discovery",
            detail:
              "A distance check marks a clue as found, the only moment React re-renders.",
          },
        ],
      },
    ],
    challenge:
      "A portfolio has a few seconds to make an impression, but it still has to answer the boring questions quickly. I wanted an opening people remember that never stands between a recruiter and the facts.",
    metrics: [
      { value: "6", label: "Results hidden on the wall" },
      { value: "0", label: "React re-renders while the light moves" },
      { value: "2", label: "Themes, following your system setting" },
    ],
    seoKeywords: ["interactive portfolio", "creative development", "CSS mask"],
    mediaNote: "You're looking at it.",
    sections: [
      {
        title: "A room you can search",
        content:
          "The hero borrows from the escape rooms behind much of my work: a CAM 01 feed and a floor plan with six real results written in UV ink. Find them all and the room clears. Every result is also listed for screen readers and in the case files, so nobody has to play to learn what I built.",
      },
      {
        title: "Practical by default",
        content:
          "Next.js 16 statically generates every page. Design tokens drive matching light and dark themes with no flash on load, and with reduced motion turned on, the lights simply stay on.",
      },
    ],
  },
];

export const projectsById = Object.fromEntries(
  portfolioProjects.map((project) => [project.id, project]),
) as Record<(typeof portfolioProjects)[number]["id"], PortfolioProject>;

export const projectIds = portfolioProjects.map((project) => project.id);

export function getProjectById(id: string) {
  return portfolioProjects.find((project) => project.id === id) ?? null;
}
