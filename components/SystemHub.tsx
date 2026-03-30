"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useSystemStore } from "@/store/systemStore";
import ResetProgressDialog from "@/components/ui/ResetProgressDialog";
import { portfolioProjects } from "@/content/portfolio";
import { Lock, ChevronRight, RotateCcw, Puzzle } from "lucide-react";

const LEVEL_HEX: Record<string, string> = {
  ACTIVE: "#4CC9F0",
  DEPLOYED: "#9D4EDD",
  DEGRADED: "#FFB800",
  OFFLINE: "#72EFDD",
  RESTRICTED: "#FF4D6D",
  EXPERIMENTAL: "#4CC9F0",
  VERIFIED: "#72EFDD",
};

const PUZZLE_COLOR: Record<string, string> = {
  auth: "#9D4EDD",
  network: "#72EFDD",
  frequency: "#FF4D6D",
  matrix: "#4CC9F0",
};

export default function SystemHub() {
  const router = useRouter();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const { accessLevel, unlockedModules, resetPuzzleProgress } =
    useSystemStore();

  const puzzleCount = portfolioProjects.filter((p) => p.puzzleType).length;
  const hasPuzzleProgress = unlockedModules.length > 0 || accessLevel > 0;

  return (
    <div className="min-h-screen bg-background circuit-grid pt-[64px] pb-16 relative overflow-hidden">
      {/* Atmospheric glow */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(76,201,240,0.035) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[50vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(157,78,221,0.03) 0%, transparent 60%)",
        }}
      />

      <ResetProgressDialog
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetPuzzleProgress}
      />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-12 md:pb-16 relative">
        <div
          className="absolute -right-6 top-0 text-[14rem] sm:text-[20rem] font-black leading-none select-none pointer-events-none overflow-hidden"
          style={{
            fontFamily: "var(--font-orbitron)",
            color: "rgba(76,201,240,0.015)",
            lineHeight: 0.9,
          }}
        >
          HUB
        </div>

        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            <h1
              className="text-5xl sm:text-7xl md:text-[7.5rem] font-black text-white leading-none tracking-[-0.02em] mb-3"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              PROJECTS
            </h1>

            <p className="text-sm font-mono text-zinc-600">
              {portfolioProjects.length} entries
              <span className="text-zinc-800 mx-2">·</span>
              <span style={{ color: "rgba(157,78,221,0.6)" }}>
                {unlockedModules.length}/{puzzleCount}
              </span>
              <span className="text-zinc-700"> puzzles solved</span>
            </p>
          </div>

          {/* Access level */}
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.25em]">
              Access Level
            </span>
            <div
              className="text-5xl sm:text-6xl font-black text-neon-purple leading-none"
              style={{
                fontFamily: "var(--font-orbitron)",
                textShadow: "0 0 36px rgba(157,78,221,0.45)",
              }}
            >
              0{accessLevel}
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 w-8 transition-all duration-700"
                  style={{
                    background:
                      i < accessLevel ? "#9D4EDD" : "rgba(255,255,255,0.06)",
                    boxShadow:
                      i < accessLevel
                        ? "0 0 6px rgba(157,78,221,0.55)"
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Utility row */}
        <div className="flex items-center gap-4 mt-6 text-[10px] font-mono text-zinc-700">
          <button
            type="button"
            onClick={() => {
              if (hasPuzzleProgress) setResetModalOpen(true);
            }}
            disabled={!hasPuzzleProgress}
            className="flex items-center gap-1.5 text-neon-amber/40 hover:text-neon-amber/70 disabled:opacity-20 disabled:pointer-events-none transition-colors uppercase tracking-widest cursor-pointer"
          >
            <RotateCcw size={9} />
            Reset Puzzles
          </button>
        </div>
      </header>

      {/* Puzzle callout */}
      {unlockedModules.length < puzzleCount && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="max-w-6xl mx-auto px-6 md:px-12 mb-8"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono"
            style={{
              background: "rgba(76,201,240,0.03)",
              border: "1px solid rgba(76,201,240,0.08)",
              color: "rgba(76,201,240,0.45)",
            }}
          >
            <Puzzle size={13} className="shrink-0" />
            <span>
              Some projects are puzzle-gated — solve a quick interactive
              challenge to unlock the full case study.
            </span>
          </div>
        </motion.div>
      )}

      {/* Project List */}
      <main className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="hidden md:grid grid-cols-[3rem_1fr_13rem_7rem_2rem] items-center pb-2.5 mb-0 border-b border-white/[0.05]">
          {["#", "Project", "Stack", "Status", ""].map((label) => (
            <span
              key={label}
              className="text-[9px] font-mono text-zinc-700 tracking-[0.2em] uppercase"
            >
              {label}
            </span>
          ))}
        </div>

        <div>
          {portfolioProjects.map((proj, index) => {
            const isLocked =
              proj.puzzleType !== null && !unlockedModules.includes(proj.id);
            const Icon = proj.icon;
            const puzzleHex =
              isLocked && proj.puzzleType
                ? PUZZLE_COLOR[proj.puzzleType]
                : undefined;
            const accentHex = isLocked
              ? (puzzleHex ?? "#FFB800")
              : LEVEL_HEX[proj.tag] || "#4CC9F0";
            const statusLabel = isLocked ? "PUZZLE" : proj.tag;

            return (
              <motion.button
                key={proj.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() =>
                  router.push(
                    isLocked ? "/puzzles/" + proj.id : "/projects/" + proj.id,
                  )
                }
                className="group relative w-full text-left border-b border-white/[0.04] overflow-hidden transition-colors duration-200 hover:bg-white/[0.015] cursor-pointer"
              >
                {/* Left accent strip */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                  style={{
                    background: accentHex,
                    boxShadow: `0 0 14px ${accentHex}70`,
                  }}
                />

                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${accentHex}07, transparent 55%)`,
                  }}
                />

                {/* Row content */}
                <div className="relative flex items-center gap-0 pl-3 pr-4 py-5 md:grid md:grid-cols-[3rem_1fr_13rem_7rem_2rem]">
                  <span className="hidden md:block text-zinc-700 font-mono text-xs select-none group-hover:text-zinc-500 transition-colors tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: isLocked
                          ? `${accentHex}08`
                          : `${accentHex}10`,
                        color: isLocked ? `${accentHex}80` : accentHex,
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.18em] block mb-0.5 truncate">
                        {proj.hubSubtitle}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold tracking-tight leading-tight transition-colors duration-200 block truncate ${isLocked ? "text-zinc-400 group-hover:text-zinc-200" : "text-zinc-200 group-hover:text-white"}`}
                      >
                        {proj.hubTitle ?? proj.title}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-3 overflow-hidden">
                    {proj.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-zinc-700 group-hover:text-zinc-500 transition-colors truncate"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="hidden md:flex items-center gap-2 justify-end">
                    <span
                      className="w-[5px] h-[5px] rounded-full shrink-0"
                      style={{
                        background: isLocked ? accentHex : "#72EFDD",
                        boxShadow: isLocked
                          ? `0 0 6px ${accentHex}80`
                          : "0 0 6px rgba(114,239,221,0.4)",
                      }}
                    />
                    <span
                      className="text-[10px] font-mono tracking-widest transition-colors"
                      style={{
                        color: isLocked
                          ? `${accentHex}70`
                          : "rgba(114,239,221,0.45)",
                      }}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {isLocked ? (
                    <Lock
                      size={11}
                      className="hidden md:block justify-self-end transition-colors"
                      style={{ color: `${accentHex}40` }}
                    />
                  ) : (
                    <ChevronRight
                      size={14}
                      className="hidden md:block text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 justify-self-end"
                    />
                  )}

                  {/* Mobile right side */}
                  <div className="md:hidden flex items-center gap-2 ml-auto pl-4 shrink-0">
                    <span
                      className="w-[5px] h-[5px] rounded-full"
                      style={{ background: isLocked ? accentHex : "#72EFDD" }}
                    />
                    {isLocked ? (
                      <Lock size={11} style={{ color: `${accentHex}50` }} />
                    ) : (
                      <ChevronRight
                        size={13}
                        className="text-zinc-600 group-hover:text-white transition-colors"
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
