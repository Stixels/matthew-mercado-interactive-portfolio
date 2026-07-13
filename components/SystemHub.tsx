"use client";

import { useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Lock,
  Play,
  RotateCcw,
} from "lucide-react";
import ResetProgressDialog from "@/components/ui/ResetProgressDialog";
import { getProjectById, getPuzzleByProjectId } from "@/content/portfolio";
import { useSystemStore } from "@/store/systemStore";

const missionIds = [
  "escape-this-frederick",
  "level-up-vr",
  "hardware",
  "portfolio",
] as const;

function subscribeToHydration(onStoreChange: () => void) {
  return useSystemStore.persist.onFinishHydration(onStoreChange);
}

function getHydrationSnapshot() {
  return useSystemStore.persist.hasHydrated();
}

function getServerHydrationSnapshot() {
  return false;
}

export default function SystemHub() {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const storedModules = useSystemStore((state) => state.unlockedModules);
  const resetPuzzleProgress = useSystemStore(
    (state) => state.resetPuzzleProgress,
  );
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const unlockedModules = hydrated ? storedModules : [];
  const solvedCount = missionIds.filter((id) =>
    unlockedModules.includes(id),
  ).length;
  const dossierUnlocked = solvedCount === missionIds.length;

  return (
    <main className="breach-shell cyber-grid">
      <ResetProgressDialog
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetPuzzleProgress}
      />

      <div className="breach-scan" aria-hidden="true" />
      <div className="page-frame breach-frame">
        <div className="breach-utility">
          <Link href="/#lab">
            <ArrowLeft aria-hidden="true" /> Portfolio
          </Link>
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            disabled={solvedCount === 0}
          >
            <RotateCcw aria-hidden="true" /> Reset
          </button>
        </div>

        <motion.header
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="breach-header"
        >
          <p className="eyebrow">Systems lab / optional</p>
          <h1 className="cyber-title">Breach the file.</h1>
          <p>Complete four short puzzles. Unlock one hidden dossier.</p>
        </motion.header>

        <div className="breach-console">
          <section className="breach-missions" aria-labelledby="missions-title">
            <div className="breach-panel-label">
              <span id="missions-title">Signals</span>
              <span>{solvedCount} / 4 clear</span>
            </div>

            {missionIds.map((projectId, index) => {
              const project = getProjectById(projectId)!;
              const puzzle = getPuzzleByProjectId(projectId)!;
              const solved = unlockedModules.includes(projectId);

              return (
                <Link
                  key={projectId}
                  href={`/puzzles/${projectId}`}
                  className={`breach-mission ${solved ? "is-solved" : ""}`}
                  style={{ "--mission-color": puzzle.hex } as CSSProperties}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="breach-mission-icon">
                    {solved ? (
                      <Check aria-hidden="true" />
                    ) : (
                      <Play aria-hidden="true" />
                    )}
                  </span>
                  <span>
                    <strong>{project.hubTitle ?? project.title}</strong>
                    <small>{puzzle.description}</small>
                  </span>
                  <span>{solved ? "CLEAR" : "RUN"}</span>
                </Link>
              );
            })}
          </section>

          <section
            className={`breach-target ${dossierUnlocked ? "is-unlocked" : ""}`}
            aria-labelledby="dossier-title"
          >
            <div className="breach-panel-label">
              <span id="dossier-title">Target file</span>
              <span>{dossierUnlocked ? "OPEN" : "LOCKED"}</span>
            </div>

            {dossierUnlocked ? (
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                className="breach-dossier"
              >
                <p>OPERATOR PROFILE / MM</p>
                <h2>Human-first systems, built end to end.</h2>
                <p>
                  I turn complicated operations into software and physical
                  systems that feel simple, reliable, and intentional.
                </p>
                <div>MEASURE · CLARIFY · FAIL SAFE · EARN FRICTION</div>
                <a href="mailto:matthew@escapedirector.com">
                  Open a channel <ArrowUpRight aria-hidden="true" />
                </a>
              </motion.div>
            ) : (
              <div className="breach-locked">
                <div className="breach-lock-mark">
                  <Lock aria-hidden="true" />
                  <span>{solvedCount}/4</span>
                </div>
                <strong>DOSSIER ENCRYPTED</strong>
                <p>Clear every signal to open the file.</p>
                <div className="breach-keyline" aria-hidden="true">
                  {missionIds.map((id) => (
                    <span
                      key={id}
                      className={unlockedModules.includes(id) ? "is-clear" : ""}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
