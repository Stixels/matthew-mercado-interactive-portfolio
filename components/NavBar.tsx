"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getProjectById, getPuzzleByProjectId } from "@/content/portfolio";

const PROJECT_HEX: Record<string, string> = {
  "escape-director": "#4CC9F0",
  "escape-this-frederick": "#9D4EDD",
  "level-up-vr": "#72EFDD",
  hardware: "#FF4D6D",
  portfolio: "#4CC9F0",
  contact: "#72EFDD",
};

export default function NavBar() {
  const pathname = usePathname();
  const [scrollPct, setScrollPct] = useState(0);

  const segments = pathname.split("/").filter(Boolean);
  const section = segments[0];
  const id = segments[1] ?? "";

  const isHub = section === "hub";
  const isProject = section === "projects";
  const isPuzzle = section === "puzzles";
  const isDetail = isProject || isPuzzle;

  const accentHex = isDetail ? (PROJECT_HEX[id] ?? "#4CC9F0") : "#4CC9F0";

  let centerLabel = "";
  if (isProject) {
    centerLabel = getProjectById(id)?.title ?? "";
  } else if (isPuzzle) {
    centerLabel = getPuzzleByProjectId(id) ? "Puzzle" : "";
  }

  useEffect(() => {
    if (!isDetail) {
      setScrollPct(0);
      return;
    }
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDetail, pathname]);

  if (pathname === "/") return null;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="fixed top-0 left-0 right-0 h-14 z-[60] flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16"
      style={{
        background:
          "linear-gradient(to bottom, rgba(2,2,4,0.95) 0%, rgba(2,2,4,0.8) 70%, transparent 100%)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Reading progress */}
      {isDetail && scrollPct > 0 && (
        <div
          className="absolute bottom-0 left-0 h-px pointer-events-none"
          style={{
            width: `${scrollPct}%`,
            background: `${accentHex}60`,
            transition: "width 80ms linear",
          }}
        />
      )}

      {/* Left */}
      <div className="flex items-center gap-3 shrink-0">
        {isDetail && (
          <Link
            href="/hub"
            className="md:hidden text-zinc-500 hover:text-white text-xs transition-colors"
            aria-label="Back"
          >
            ← Back
          </Link>
        )}

        <Link
          href="/"
          className={`${isDetail ? "hidden md:block" : "block"} text-[11px] tracking-[0.25em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors duration-200`}
        >
          MM
        </Link>
      </div>

      {/* Center */}
      <div className="flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase">
        {isHub && (
          <>
            <Link
              href="/hub"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Projects
            </Link>
            <span className="text-zinc-800">/</span>
            <Link
              href="/projects/contact"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              About
            </Link>
          </>
        )}

        {isDetail && (
          <div className="flex items-center gap-2">
            <Link
              href="/hub"
              className="hidden md:inline text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              Projects
            </Link>
            {centerLabel && (
              <>
                <span className="hidden md:inline text-zinc-800">/</span>
                <span
                  className="truncate max-w-[180px] sm:max-w-[240px]"
                  style={{ color: `${accentHex}70` }}
                >
                  {centerLabel}
                </span>
              </>
            )}
          </div>
        )}

        {!isHub && !isDetail && (
          <Link
            href="/hub"
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            Projects
          </Link>
        )}
      </div>

      {/* Right — empty for balance, or contact on hub */}
      <div className="shrink-0 w-8 md:w-12">
        {isHub && (
          <Link
            href="mailto:matthew@escapedirector.com"
            className="hidden md:block text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors tracking-wide text-right"
          >
            Contact
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
