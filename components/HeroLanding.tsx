"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getProjectById } from "@/content/portfolio";

const contactProject = getProjectById("contact");

const FIRST_NAME = "MATTHEW".split("");
const LAST_NAME = "MERCADO".split("");
const STAGGER = 0.04;
const FIRST_START = 0.25;
const LAST_START = FIRST_START + FIRST_NAME.length * STAGGER + 0.04;
const LINE_START = LAST_START + LAST_NAME.length * STAGGER + 0.1;
const ROLE_START = LINE_START + 0.15;
const DESC_START = ROLE_START + 0.08;
const PILL_START = DESC_START + 0.1;
const CTA_START = PILL_START + 0.15;

function NameLetter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: "0.3em", filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}

export default function HeroLanding() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.3, y: 0.4 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[100dvh] bg-background flex flex-col relative overflow-hidden"
    >
      <div className="absolute inset-0 circuit-grid opacity-20" />

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-[900ms] ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(76,201,240,0.04) 0%, transparent 50%)`,
        }}
      />

      <div
        className="absolute top-0 left-0 w-[60vw] h-[45vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 0%, rgba(76,201,240,0.045) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[50vw] h-[40vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 90% 100%, rgba(157,78,221,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-5 sm:pt-7">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-600"
        >
          MM
        </motion.span>

        <motion.a
          href="mailto:matthew@escapedirector.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[11px] font-mono tracking-wide text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
        >
          <span className="hidden sm:inline">matthew@escapedirector.com</span>
          <span className="sm:hidden">Contact</span>
        </motion.a>
      </header>

      {/* Hero */}
      <div className="flex-1 flex items-center relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 pb-16 sm:pb-20">
        <div className="w-full max-w-4xl">
          {/* MATTHEW */}
          <h1
            className="select-none"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span
              className="font-black tracking-[0.02em] leading-[0.88] block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem]"
              style={{ color: "#ffffff" }}
            >
              {FIRST_NAME.map((char, i) => (
                <NameLetter
                  key={`f-${i}`}
                  char={char}
                  delay={FIRST_START + i * STAGGER}
                />
              ))}
            </span>
            {/* MERCADO */}
            <span
              className="font-black tracking-[0.02em] leading-[0.88] block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem]"
              style={{ color: "rgba(255,255,255,0.1)" }}
            >
              {LAST_NAME.map((char, i) => (
                <NameLetter
                  key={`l-${i}`}
                  char={char}
                  delay={LAST_START + i * STAGGER}
                />
              ))}
            </span>
          </h1>

          {/* Gradient line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: LINE_START,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 sm:mt-8 mb-5 h-px w-32 sm:w-44 origin-left"
            style={{
              background:
                "linear-gradient(to right, rgba(76,201,240,0.55), transparent)",
            }}
          />

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ROLE_START, duration: 0.45 }}
            className="text-[11px] sm:text-xs font-mono tracking-[0.22em] uppercase"
            style={{ color: "rgba(76,201,240,0.5)" }}
          >
            {contactProject?.role ?? "Software Engineer & Designer"}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: DESC_START, duration: 0.45 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-400 max-w-md leading-relaxed"
          >
            Building products that run live escape rooms, move real conversion
            metrics, and wire up the hardware behind immersive experiences.
          </motion.p>

          {/* Available */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: PILL_START, duration: 0.4 }}
            className="mt-6 sm:mt-7 inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-mono"
            style={{ color: "rgba(114,239,221,0.5)" }}
          >
            <span className="relative flex h-[7px] w-[7px]">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-40"
                style={{
                  background: "#72EFDD",
                  animation: "pulseRing 2.5s ease-out infinite",
                }}
              />
              <span
                className="relative inline-flex rounded-full h-full w-full"
                style={{
                  background: "#72EFDD",
                  boxShadow: "0 0 6px rgba(114,239,221,0.5)",
                }}
              />
            </span>
            Available for Opportunities
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: CTA_START, duration: 0.45 }}
            className="mt-8 sm:mt-10"
          >
            <button
              onClick={() => router.push("/hub")}
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg text-[13px] sm:text-sm font-semibold tracking-wide overflow-hidden cursor-pointer transition-all duration-300 hover:border-[rgba(76,201,240,0.45)] hover:shadow-[0_0_24px_rgba(76,201,240,0.08)]"
              style={{
                border: "1px solid rgba(76,201,240,0.22)",
                background: "rgba(76,201,240,0.05)",
                color: "#4CC9F0",
              }}
            >
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(76,201,240,0.08), transparent)",
                }}
              />
              <span className="relative z-10">Explore My Work</span>
              <ArrowRight
                size={15}
                className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
