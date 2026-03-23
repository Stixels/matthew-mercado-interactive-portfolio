'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Server, Zap, Shield, Activity, Github, Code2, Monitor, Wifi, BarChart3, TrendingUp, Layers, Wrench, Cpu, Database } from 'lucide-react';

const PROJECTS: Record<string, any> = {
  core: {
    title: 'Escape Director',
    id: '01',
    status: 'ACTIVE',
    role: 'Founder & Full-Stack Engineer',
    timeline: '2023 — Present',
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'Stripe', 'Railway'],
    overview: 'A SaaS gamemaster dashboard and analytics platform for escape room operators — the most intuitive tool in the industry. Manages 6,000+ rooms globally with 99.99% uptime and an offline-first architecture built for the realities of venue Wi-Fi.',
    color: 'neon-blue',
    sections: [
      { icon: Monitor, title: 'Gamemaster Dashboard', content: 'Built for speed under pressure. Clue delivery, puzzle tracking, countdown management, and room-specific effects — all from a single distraction-free interface. The learning curve is minutes, not days. Every interaction was designed around the split-second reality of a live session.' },
      { icon: Server, title: 'Platform Architecture', content: 'Next.js frontend, Express API, PostgreSQL on Railway. Better Auth handles subscription-based access control and Stripe powers billing. The full stack was chosen for reliability and minimal operational overhead.' },
      { icon: Wifi, title: 'Offline-First PWA', content: 'A service worker caches 24 hours of session data locally. Gamemasters run live rooms through complete Wi-Fi outages — the app never goes blank. Data syncs silently in the background the moment connectivity returns.' },
      { icon: BarChart3, title: 'Room Analytics', content: 'Per-room stats: success rates, average completion times, clue usage patterns, and session logs filterable by date, staff, and group size. Operators identify bottleneck puzzles and coaching opportunities without leaving the dashboard.' },
    ],
  },
  data: {
    title: 'Escape This Frederick',
    id: '02',
    status: 'DEPLOYED',
    role: 'Web Developer & Product Lead',
    timeline: '2022 — Present',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Bookeo API', 'Mailchimp', 'Vercel'],
    overview: 'A complete digital overhaul of Maryland\'s highest-rated escape room. Rebuilt from a 52 Lighthouse score to 97, doubled the conversion rate from 2.5% to 5%, and secured the #1 local SEO position statewide.',
    color: 'neon-purple',
    sections: [
      { icon: Zap, title: 'Performance Overhaul', content: 'Rebuilt from scratch with modern architecture — Lighthouse jumped from 52 to 97. Improved Core Web Vitals drove a 35% reduction in bounce rate and cemented the #1 local SEO position statewide.' },
      { icon: TrendingUp, title: 'Conversion Engineering', content: 'Conversion rate doubled from 2.5% to 5% through a redesigned booking flow, stronger visual room storytelling, and clearer CTAs. Every change was backed by session data, not guesswork.' },
      { icon: Database, title: 'Custom Waiver System', content: 'Full-stack waiver app on Next.js, Prisma, and PostgreSQL — integrated with Bookeo for booking data and Mailchimp for automated campaigns. Owning the pipeline increased remarketing capacity 8×.' },
      { icon: Wrench, title: 'Puzzle Engineering', content: 'Beyond the web stack — designed and wired custom Arduino circuits and PLC logic for several of the venue\'s award-winning physical rooms. Software and hardware working as a unified system.' },
    ],
  },
  terminal: {
    title: 'Level Up VR',
    id: '03',
    status: 'DEPLOYED',
    role: 'Designer & Frontend Engineer',
    timeline: '2023 — Present',
    stack: ['HTML', 'CSS', 'Vanilla JS', 'Resova', 'Custom Animations'],
    overview: 'Designed and built from scratch — a fully custom web presence for a location-based VR venue that claimed the #1 local SEO rank for VR in Frederick on day one, outperforming established competitors.',
    color: 'neon-green',
    sections: [
      { icon: Layers, title: 'Ground-Up Design & Build', content: 'No templates. No CMS. No hand-offs. Every screen designed from scratch with layered visual depth, bold typographic hierarchy, and motion that mirrors the immersive nature of the physical venue. The site had to feel as premium as the experience it was selling.', span: 'full' },
      { icon: Activity, title: 'Custom Motion', content: 'Every animation hand-coded in vanilla JavaScript — no library dependencies. Scroll-driven parallax, staggered reveals, and hover interactions, each tuned to the brand. Zero third-party overhead means nothing can drift or break the aesthetic.' },
      { icon: TrendingUp, title: 'Results', content: '#1 local SEO for VR in Frederick on launch. Resova booking widget embedded and restyled to eliminate friction between discovery and reservation. Game catalog scales as the venue adds new titles — no developer involvement required.' },
    ],
  },
  security: {
    title: 'Hardware & Puzzle Engineering',
    id: '04',
    status: 'RESTRICTED',
    role: 'Puzzle Engineer & Hardware Developer',
    timeline: '2020 — Present',
    stack: ['Arduino', 'Raspberry Pi', 'C++', 'Python', 'PLCs', 'Custom Circuits'],
    overview: 'The physical layer behind award-winning escape room experiences — custom Arduino circuits, PLC logic, and multi-stage puzzle sequences that bridge software and hardware into seamless live games.',
    color: 'error-red',
    sections: [
      { icon: Cpu, title: 'Circuit Design', content: 'Custom Arduino circuits for multi-stage puzzle sequences — reed switches, electromagnets, servos, and custom lighting rigs. Every puzzle is built as a discrete, modular unit. Faulty components can be swapped on-site in minutes without tearing down the room.' },
      { icon: Code2, title: 'Control Architecture', content: 'Raspberry Pi units serve as local control nodes, running Python services that manage room state and sync with the Escape Director platform over the local network. Physical puzzle events trigger digital responses in real time.' },
      { icon: Shield, title: 'Fail-Safe Design', content: 'Hardware downtime in a live show is unacceptable. Every circuit includes failover paths, watchdog timers, and manual overrides. A single component failure cannot kill a session — the show goes on.' },
      { icon: Activity, title: 'Scale', content: 'Modular puzzle architecture means new rooms are built by adapting proven circuit templates rather than redesigning from scratch. Each build compounds the reliability of the last. No room gets a one-off design.' },
    ],
  },
  ai: {
    title: 'Interactive Portfolio',
    id: '05',
    status: 'EXPERIMENTAL',
    role: 'Full-Stack Engineer & Designer',
    timeline: '2025 — Present',
    stack: ['Next.js 16', 'TypeScript', 'Motion', 'Zustand', 'Tailwind CSS v4'],
    overview: 'The portfolio you\'re navigating right now — an escape-room-themed interface where puzzles gate access to project details. The site demonstrates the work by being the work.',
    color: 'neon-blue',
    sections: [
      { icon: Layers, title: 'Concept & Design', content: 'An escape-room-themed interface where puzzles gate access to project details. Visitors become participants instead of passive readers. The friction is intentional — the metaphor is the UX, not a limitation of it.', span: 'full' },
      { icon: Activity, title: 'Animation System', content: 'Motion drives transitions and puzzle interactions. CRT scanlines, circuit grid, glitch effects, and the scan beam are custom CSS — mostly GPU-accelerated transforms with minimal JS.' },
      { icon: Server, title: 'Architecture', content: 'Next.js 16 App Router with Turbopack for dev and production builds, React 19, and strict TypeScript. Zustand holds the unlock graph across boot, puzzles, and module access. Tailwind CSS v4 with @theme tokens. Core routes are statically generated and typechecked at build time.' },
    ],
  },
  contact: {
    title: 'Matthew Mercado',
    id: '06',
    status: 'VERIFIED',
    role: 'Full-Stack Engineer & Designer',
    timeline: 'LIFETIME',
    stack: ['Next.js', 'TypeScript', 'React', 'Arduino', 'Raspberry Pi'],
    overview: 'Full-stack engineer with a focus on frontend craft, UI/UX design, and immersive digital experiences. Builds products that run live escape rooms, moves real conversion metrics, and wires up the physical puzzles inside the rooms.',
    color: 'neon-green',
  },
};

const STATUS_CONFIG: Record<string, { dot: string; label: string }> = {
  ACTIVE:       { dot: 'bg-neon-green',  label: 'text-neon-green'  },
  DEPLOYED:     { dot: 'bg-neon-purple', label: 'text-neon-purple' },
  DEGRADED:     { dot: 'bg-neon-amber',  label: 'text-neon-amber'  },
  OFFLINE:      { dot: 'bg-zinc-500',    label: 'text-zinc-400'    },
  RESTRICTED:   { dot: 'bg-error-red',   label: 'text-error-red'  },
  EXPERIMENTAL: { dot: 'bg-neon-blue',   label: 'text-neon-blue'  },
  VERIFIED:     { dot: 'bg-neon-green',  label: 'text-neon-green'  },
};


export default function ProjectView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const project = PROJECTS[projectId] ?? null;

  if (!project) return null;

  const { color } = project;
  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.ACTIVE;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-12 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none circuit-grid opacity-40" />
      <div className={`absolute -top-32 right-0 w-[700px] h-[700px] bg-${color}/5 rounded-full blur-[140px]`} />
      <div className={`absolute bottom-0 -left-32 w-[500px] h-[500px] bg-${color}/4 rounded-full blur-[120px]`} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Back nav */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/hub')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300 mb-10 font-mono text-xs uppercase tracking-[0.15em] group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Return to Database</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <header className="mb-10 sm:mb-14 relative">
            {/* Ghost project ID */}
            <div
              className="absolute -top-6 -left-2 sm:-top-8 sm:-left-4 text-[7rem] sm:text-[10rem] md:text-[14rem] font-bold leading-none select-none pointer-events-none text-white/[0.025] overflow-hidden"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {project.id}
            </div>

            <div className="relative">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/8 bg-white/[0.03] text-[10px] font-mono tracking-[0.2em] mb-4 sm:mb-5 ${statusCfg.label}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                STATUS: {project.status}
              </motion.div>

              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight mb-3 leading-tight">
                {project.title}
              </h1>

              <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm text-${color}/70`}>
                <span>{project.role}</span>
                <span className="text-white/15 hidden sm:inline">│</span>
                <span className="text-zinc-500">{project.timeline}</span>
              </div>

              {/* Divider line */}
              <div className={`mt-5 sm:mt-6 h-px bg-gradient-to-r from-${color}/30 via-${color}/10 to-transparent`} />
            </div>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mt-6 sm:mt-8">
              {project.overview}
            </p>
          </header>

          {/* Tech Stack */}
          <div className="mb-10 sm:mb-14 pb-10 sm:pb-14 border-b border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-600 tracking-[0.25em] uppercase mb-5">
              Technologies Deployed
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech: string, i: number) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all duration-300 cursor-default
                    bg-white/[0.03] border-white/8 text-zinc-400
                    hover:bg-${color}/8 hover:border-${color}/25 hover:text-${color}`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          {project.sections && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {project.sections.map((section: any, i: number) => {
                const SectionIcon = section.icon ?? Code2;
                return (
                  <motion.section
                    key={section.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    className={`relative pl-5 ${section.span === 'full' ? 'md:col-span-2' : ''}`}
                  >
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-${color}/40 to-transparent rounded-full`} />

                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-1.5 rounded-md bg-${color}/10`}>
                        <SectionIcon size={16} className={`text-${color}`} />
                      </div>
                      <h2 className="text-base font-semibold text-white tracking-wide">{section.title}</h2>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{section.content}</p>
                  </motion.section>
                );
              })}
            </div>
          )}

          {/* Contact section */}
          {projectId === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-20 pt-12 border-t border-white/[0.06]"
            >
              <p className="text-[10px] font-mono text-zinc-600 tracking-[0.25em] uppercase mb-8 text-center">
                Initiate Sequence
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="mailto:matthew@escapedirector.com"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold tracking-wide text-sm overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 bg-neon-green text-black hover:bg-neon-green/90"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Zap size={16} />
                  matthew@escapedirector.com
                </a>
                <a
                  href="#"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold tracking-wide text-sm flex items-center justify-center gap-3 transition-all duration-300 border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/8 hover:border-white/20 hover:text-white"
                >
                  <Github size={16} />
                  GitHub Profile
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
