'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Github, Zap } from 'lucide-react';
import { getProjectById, portfolioProjects } from '@/content/portfolio';
import type { ProjectSection } from '@/content/portfolio';

const STATUS_CONFIG: Record<string, { dot: string; hex: string }> = {
  ACTIVE:       { dot: 'bg-neon-green',  hex: '#72EFDD' },
  DEPLOYED:     { dot: 'bg-neon-purple', hex: '#9D4EDD' },
  DEGRADED:     { dot: 'bg-neon-amber',  hex: '#FFB800' },
  OFFLINE:      { dot: 'bg-zinc-500',    hex: '#71717a' },
  RESTRICTED:   { dot: 'bg-error-red',   hex: '#FF4D6D' },
  EXPERIMENTAL: { dot: 'bg-neon-blue',   hex: '#4CC9F0' },
  VERIFIED:     { dot: 'bg-neon-green',  hex: '#72EFDD' },
};

export default function ProjectView({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);

  if (!project) return null;

  const projectNumber = String(portfolioProjects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0');
  const { color } = project;
  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.ACTIVE;

  return (
    <div className="min-h-screen bg-background pt-[64px] px-4 pb-16 sm:px-8 md:px-14 relative overflow-hidden">
      {/* Atmospheric glow — project color */}
      <div
        className="absolute -top-40 right-0 w-[55vw] h-[70vh] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 75% 0%, var(--color-${color}, #4CC9F0) 0%, transparent 60%)`, opacity: 0.05 }}
      />
      <div
        className="absolute top-0 right-0 w-[45vw] h-[60vh] pointer-events-none opacity-[0.35]"
        style={{ background: `radial-gradient(ellipse at 85% 5%, ${statusCfg.hex}08 0%, transparent 55%)` }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >

          {/* ── Header ────────────────────────────────────────────── */}
          <header className="pt-10 pb-12 sm:pb-16 relative">

            {/* Giant ghost project number — visual anchor */}
            <div
              className="absolute right-0 -top-2 text-[12rem] sm:text-[18rem] md:text-[24rem] font-black leading-none select-none pointer-events-none"
              style={{ fontFamily: 'var(--font-orbitron)', color: 'rgba(255,255,255,0.024)', lineHeight: 0.85 }}
            >
              {projectNumber}
            </div>

            {/* Status — minimal underline style */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-6 pb-1 text-[10px] font-mono tracking-[0.25em] uppercase"
              style={{
                color: statusCfg.hex,
                opacity: 0.7,
                borderBottom: `1px solid ${statusCfg.hex}50`,
              }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
              {project.status}
            </motion.div>

            {/* Title — dominant, large */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[0.9] mb-5 max-w-2xl"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {project.title}
            </motion.h1>

            {/* Metadata strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm mb-7"
            >
              <span style={{ color: 'rgba(76,201,240,0.6)' }}>{project.role}</span>
              <span className="text-zinc-800">·</span>
              <span className="text-zinc-600">{project.timeline}</span>
            </motion.div>

            {/* Gradient divider */}
            <div
              className="h-px mb-8"
              style={{ background: `linear-gradient(to right, ${statusCfg.hex}40 0%, ${statusCfg.hex}10 35%, transparent 65%)` }}
            />

            {/* Overview */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl"
            >
              {project.overview}
            </motion.p>
          </header>

          {/* ── Screenshots ───────────────────────────────────────── */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 sm:mb-16"
            >
              {projectId === 'contact' ? (
                /* Contact: portrait layout */
                <div className="flex items-start gap-6">
                  <div
                    className="relative shrink-0 w-24 sm:w-32 overflow-hidden rounded-xl"
                    style={{ border: `1px solid ${statusCfg.hex}20`, boxShadow: `0 0 32px ${statusCfg.hex}10` }}
                  >
                    <Image
                      src={project.screenshots[0]}
                      alt="Matthew Mercado"
                      width={128}
                      height={160}
                      className="w-full object-cover object-top"
                      style={{ display: 'block', aspectRatio: '4/5' }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(to bottom, transparent 60%, rgba(2,2,4,0.7))` }}
                    />
                  </div>
                  <div className="pt-1">
                    <p className="text-[9px] font-mono text-zinc-700 tracking-[0.3em] uppercase mb-2">Profile</p>
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                      Full-stack engineer and creative developer. Building escape room technology, SaaS platforms, and the hardware that powers live experiences.
                    </p>
                  </div>
                </div>
              ) : (
                /* Project pages: full-width screenshot strip */
                <div className={`grid gap-3 ${project.screenshots.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  {project.screenshots.map((src, idx) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + idx * 0.1 }}
                      className={`relative overflow-hidden rounded-xl ${idx === 0 && project.screenshots!.length > 1 ? 'sm:col-span-2' : ''}`}
                      style={{
                        border: `1px solid ${statusCfg.hex}15`,
                        boxShadow: `0 0 40px ${statusCfg.hex}08, 0 16px 48px rgba(0,0,0,0.4)`,
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        width={1280}
                        height={800}
                        className="w-full object-cover object-top"
                        style={{ display: 'block', maxHeight: idx === 0 ? '480px' : '280px' }}
                      />
                      {/* Subtle bottom fade */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(2,2,4,0.6))' }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Tech Stack ────────────────────────────────────────── */}
          <div className="pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-white/[0.04]">
            <p className="text-[9px] font-mono text-zinc-700 tracking-[0.35em] uppercase mb-5">Stack</p>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {project.stack.map((tech: string, i: number) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className={`text-sm font-mono text-zinc-500 hover:text-${color} transition-colors duration-200 cursor-default`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Detail Sections ───────────────────────────────────── */}
          {project.sections && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-16">
              {project.sections.map((section: ProjectSection, i: number) => {
                const SectionIcon = section.icon;
                return (
                  <motion.section
                    key={section.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`relative border-l border-white/[0.06] pl-5 ${section.span === 'full' ? 'md:col-span-2' : ''}`}
                  >
                    {/* Left accent fade */}
                    <div
                      className="absolute left-[-1px] top-0 h-12 w-px"
                      style={{ background: `linear-gradient(to bottom, ${statusCfg.hex}35, transparent)` }}
                    />

                    <div className="flex items-center gap-2 mb-2.5">
                      <SectionIcon size={13} style={{ color: 'rgba(76,201,240,0.5)' }} className="shrink-0" />
                      <h2 className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase">{section.title}</h2>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{section.content}</p>
                  </motion.section>
                );
              })}
            </div>
          )}

          {/* ── Contact ───────────────────────────────────────────── */}
          {projectId === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="pt-12 border-t border-white/[0.04]"
            >
              <p className="text-[9px] font-mono text-zinc-700 tracking-[0.35em] uppercase mb-8">
                Get In Touch
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:matthew@escapedirector.com"
                  className="group relative px-7 py-3.5 rounded-lg font-semibold tracking-wide text-sm overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 bg-neon-green text-black hover:bg-neon-green/90 font-mono"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Zap size={14} />
                  matthew@escapedirector.com
                </a>
                <a
                  href="#"
                  className="px-7 py-3.5 rounded-lg font-mono text-sm flex items-center justify-center gap-3 transition-all duration-300 border border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:bg-white/[0.05] hover:border-white/12 hover:text-zinc-200"
                >
                  <Github size={14} />
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
