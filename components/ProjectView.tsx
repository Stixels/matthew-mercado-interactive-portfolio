"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Github, Zap } from "lucide-react";
import { getProjectById, portfolioProjects } from "@/content/portfolio";
import type { ProjectSection } from "@/content/portfolio";

const STATUS_CONFIG: Record<string, { hex: string }> = {
  ACTIVE: { hex: "#72EFDD" },
  DEPLOYED: { hex: "#9D4EDD" },
  DEGRADED: { hex: "#FFB800" },
  OFFLINE: { hex: "#71717a" },
  RESTRICTED: { hex: "#FF4D6D" },
  EXPERIMENTAL: { hex: "#4CC9F0" },
  VERIFIED: { hex: "#72EFDD" },
};

type SlotSize = "full" | "half";

function getSectionSlots(
  sections: ProjectSection[],
  projectIndex: number,
): SlotSize[] {
  const count = sections.length;
  const hasFullSpan = sections.some((s) => s.span === "full");

  if (count === 4 && !hasFullSpan) {
    return projectIndex % 2 === 0
      ? ["full", "half", "half", "full"]
      : ["half", "half", "half", "half"];
  }

  if (count === 3 && hasFullSpan) {
    return sections.map((s) => (s.span === "full" ? "full" : "half"));
  }

  if (count === 3) {
    return ["half", "half", "full"];
  }

  return sections.map((s) => (s.span === "full" ? "full" : "half"));
}

function FullSection({
  section,
  num,
  hex,
  delay,
  isLast,
}: {
  section: ProjectSection;
  num: string;
  hex: string;
  delay: number;
  isLast: boolean;
}) {
  const Icon = section.icon;
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="md:col-span-2 relative"
    >
      <div
        className="relative rounded-lg px-5 sm:px-7 py-6 sm:py-8 md:py-10"
        style={{ background: `${hex}04` }}
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
          {/* Large number */}
          <span
            className="text-5xl md:text-7xl font-black leading-none select-none shrink-0"
            style={{ fontFamily: "var(--font-orbitron)", color: `${hex}12` }}
          >
            {num}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ background: `${hex}0c`, border: `1px solid ${hex}15` }}
              >
                <Icon size={13} style={{ color: `${hex}80` }} />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-tight">
                {section.title}
              </h2>
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed max-w-2xl">
              {section.content}
            </p>
          </div>
        </div>
      </div>

      {!isLast && (
        <div
          className="mt-8 h-px mx-4"
          style={{
            background: `linear-gradient(to right, ${hex}15, transparent 50%)`,
          }}
        />
      )}
    </motion.section>
  );
}

function HalfSection({
  section,
  num,
  hex,
  delay,
}: {
  section: ProjectSection;
  num: string;
  hex: string;
  delay: number;
}) {
  const Icon = section.icon;
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="relative pl-4 sm:pl-5 border-l border-white/[0.05]">
        {/* Colored accent on top of left border */}
        <div
          className="absolute left-[-1px] top-0 w-px h-8"
          style={{
            background: `linear-gradient(to bottom, ${hex}50, transparent)`,
          }}
        />

        <span
          className="text-3xl sm:text-4xl font-black leading-none select-none block mb-3"
          style={{ fontFamily: "var(--font-orbitron)", color: `${hex}0c` }}
        >
          {num}
        </span>

        <div className="flex items-center gap-2 mb-2">
          <Icon size={13} style={{ color: `${hex}65` }} className="shrink-0" />
          <h2 className="text-sm font-semibold text-zinc-200 tracking-tight">
            {section.title}
          </h2>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed">
          {section.content}
        </p>
      </div>
    </motion.section>
  );
}

export default function ProjectView({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);

  if (!project) return null;

  const projectIndex = portfolioProjects.findIndex(
    (item) => item.id === project.id,
  );
  const projectNumber = String(projectIndex + 1).padStart(2, "0");
  const hex = (STATUS_CONFIG[project.status] ?? STATUS_CONFIG.ACTIVE).hex;

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 relative overflow-hidden">
      {/* Atmospheric header gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[45vh] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 35% 0%, ${hex}0a 0%, transparent 55%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 px-5 sm:px-8 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* ── Header ──────────────────────────────────────────── */}
          <header className="pt-6 sm:pt-10 pb-10 sm:pb-14 relative">
            <div
              className="absolute right-0 -top-4 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-orbitron)",
                color: `${hex}05`,
                lineHeight: 0.85,
              }}
            >
              {projectNumber}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 }}
              className="flex items-center gap-2 mb-5 text-[10px] font-mono tracking-[0.25em] uppercase"
              style={{ color: `${hex}88` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: hex, boxShadow: `0 0 6px ${hex}` }}
              />
              {project.status}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.92] mb-5 max-w-xl"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs sm:text-sm mb-7"
            >
              <span style={{ color: `${hex}80` }}>{project.role}</span>
              <span className="text-zinc-800">·</span>
              <span className="text-zinc-500">{project.timeline}</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.22,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-px mb-7 origin-left max-w-sm"
              style={{
                background: `linear-gradient(to right, ${hex}50, transparent)`,
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl"
            >
              {project.overview}
            </motion.p>
          </header>

          {/* ── Screenshots ─────────────────────────────────────── */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="mb-12 sm:mb-16"
            >
              {projectId === "contact" ? (
                <div className="flex items-start gap-5 sm:gap-7">
                  <div
                    className="relative shrink-0 w-24 sm:w-32 overflow-hidden rounded-lg"
                    style={{ border: `1px solid ${hex}20` }}
                  >
                    <Image
                      src={project.screenshots[0]}
                      alt="Matthew Mercado"
                      width={128}
                      height={160}
                      className="w-full object-cover object-top"
                      style={{ display: "block", aspectRatio: "4/5" }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 60%, rgba(2,2,4,0.6))",
                      }}
                    />
                  </div>
                  <div className="pt-1">
                    <p className="text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase mb-2">
                      Profile
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                      Full-stack engineer and creative developer. Building
                      escape room technology, SaaS platforms, and the hardware
                      that powers live experiences.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={`grid gap-3 ${project.screenshots.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
                >
                  {project.screenshots.map((src, idx) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.36 + idx * 0.08 }}
                      className={`relative overflow-hidden rounded-lg group ${
                        idx === 0 && project.screenshots!.length > 1
                          ? "sm:col-span-2"
                          : ""
                      }`}
                      style={{
                        border: `1px solid ${hex}14`,
                        boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        width={1280}
                        height={800}
                        className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                        style={{
                          display: "block",
                          maxHeight: idx === 0 ? "440px" : "260px",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent, rgba(2,2,4,0.5))",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Tech Stack ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-white/[0.04]"
          >
            <p className="text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase mb-4">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech: string, i: number) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="px-3 py-1 rounded text-xs font-mono cursor-default transition-colors duration-200"
                  style={{
                    background: `${hex}08`,
                    border: `1px solid ${hex}12`,
                    color: `${hex}80`,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Detail Sections ──────────────────────────────────── */}
          {project.sections &&
            (() => {
              const sections = project.sections;
              const slots = getSectionSlots(sections, projectIndex);

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10 mb-16">
                  {sections.map((section, i) => {
                    const num = String(i + 1).padStart(2, "0");
                    const delay = 0.3 + i * 0.07;
                    const isLast = i === sections.length - 1;

                    if (slots[i] === "full") {
                      return (
                        <FullSection
                          key={section.title}
                          section={section}
                          num={num}
                          hex={hex}
                          delay={delay}
                          isLast={isLast}
                        />
                      );
                    }

                    return (
                      <HalfSection
                        key={section.title}
                        section={section}
                        num={num}
                        hex={hex}
                        delay={delay}
                      />
                    );
                  })}
                </div>
              );
            })()}

          {/* ── Contact ─────────────────────────────────────────── */}
          {projectId === "contact" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="pt-10 border-t border-white/[0.04]"
            >
              <p className="text-[9px] font-mono text-zinc-600 tracking-[0.3em] uppercase mb-6">
                Get In Touch
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:matthew@escapedirector.com"
                  className="px-6 py-3.5 rounded-lg font-semibold tracking-wide text-sm flex items-center justify-center gap-2.5 transition-all duration-300 font-mono hover:shadow-[0_0_24px_rgba(114,239,221,0.2)]"
                  style={{ background: "#72EFDD", color: "#020204" }}
                >
                  <Zap size={14} />
                  matthew@escapedirector.com
                </a>
                <a
                  href="#"
                  className="px-6 py-3.5 rounded-lg font-mono text-sm flex items-center justify-center gap-2.5 transition-all duration-200 border border-white/[0.07] text-zinc-500 hover:text-zinc-200 hover:border-white/12"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
