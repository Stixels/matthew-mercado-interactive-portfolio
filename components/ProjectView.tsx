'use client';

import { motion } from 'motion/react';
import { Github, Zap } from 'lucide-react';
import { getProjectById, portfolioProjects } from '@/content/portfolio';
import type { ProjectSection } from '@/content/portfolio';

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
  const project = getProjectById(projectId);

  if (!project) return null;

  const projectNumber = String(portfolioProjects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0');
  const { color } = project;
  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.ACTIVE;

  return (
    <div className="min-h-screen bg-background pt-[64px] px-4 pb-4 sm:px-6 sm:pb-6 md:px-12 md:pb-12 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none circuit-grid opacity-40" />
      <div className={`absolute -top-32 right-0 w-[700px] h-[700px] bg-${color}/5 rounded-full blur-[140px]`} />
      <div className={`absolute bottom-0 -left-32 w-[500px] h-[500px] bg-${color}/4 rounded-full blur-[120px]`} />

      <div className="max-w-5xl mx-auto relative z-10">

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
              {projectNumber}
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
              Tech Stack
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
              {project.sections.map((section: ProjectSection, i: number) => {
                const SectionIcon = section.icon;
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
                Get In Touch
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
