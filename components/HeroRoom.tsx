"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const ROTATING_WORDS = [
  "the real world.",
  "escape rooms.",
  "AI agents.",
  "developer teams.",
  "live operations.",
] as const;

const GLYPHS = "ABCDEFGHJKLNPRSTUVXYZ0123456789/<>*";

const clues = [
  {
    id: "sessions",
    label: "Escape Director",
    value: "8,000+ live sessions",
    note: "at 99.95% uptime",
  },
  {
    id: "mcp",
    label: "Enterprise LLM platform",
    value: "3 of 4 MCP servers",
    note: "running in production",
  },
  {
    id: "speed",
    label: "100,000+ entity datasets",
    value: "7 min → under 1",
    note: "batched writes, tuned queries",
  },
  {
    id: "workflow",
    label: "Legacy rewrite",
    value: "−90% task time",
    note: "shipped 3 months early",
  },
  {
    id: "conversion",
    label: "Escape This Frederick",
    value: "2× conversion",
    note: "Lighthouse 52 → 97",
  },
  {
    id: "hardware",
    label: "Open-source Arduino SDK",
    value: "Props talk to live games",
    note: "C++, MIT licensed",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function ScrambledWord({ enabled }: { enabled: boolean }) {
  const [text, setText] = useState<string>(ROTATING_WORDS[0]);

  useEffect(() => {
    if (!enabled) return;

    let index = 0;
    let stepTimer: ReturnType<typeof setTimeout> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    const decodeNext = () => {
      index = (index + 1) % ROTATING_WORDS.length;
      const target = ROTATING_WORDS[index];
      let tick = 0;

      const step = () => {
        tick += 1;
        const revealed = Math.max(0, tick - 4);
        let output = "";
        for (let i = 0; i < target.length; i += 1) {
          const char = target[i];
          output +=
            i < revealed || char === " " || char === "."
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setText(output);

        if (revealed < target.length) {
          stepTimer = setTimeout(step, 28);
        } else {
          holdTimer = setTimeout(decodeNext, 2600);
        }
      };

      step();
    };

    holdTimer = setTimeout(decodeNext, 3200);
    return () => {
      clearTimeout(stepTimer);
      clearTimeout(holdTimer);
    };
  }, [enabled]);

  return <>{text}</>;
}

export default function HeroRoom() {
  const heroRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const clueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const found = useRef<Set<string>>(new Set());
  const reducedMotion = useReducedMotion() ?? false;
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [hasMoved, setHasMoved] = useState(false);
  const cleared = foundIds.length === clues.length;

  useEffect(() => {
    const hero = heroRef.current;
    const field = fieldRef.current;
    if (!hero || !field) return;

    let frame = 0;
    let lastPointer = 0;
    let pointerActive = false;
    let light = { x: 0, y: 0 };
    const start = performance.now();
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    const applyLight = (clientX: number, clientY: number) => {
      const heroRect = hero.getBoundingClientRect();
      const fieldRect = field.getBoundingClientRect();
      light = { x: clientX, y: clientY };
      hero.style.setProperty("--light-x", `${clientX - heroRect.left}px`);
      hero.style.setProperty("--light-y", `${clientY - heroRect.top}px`);
      field.style.setProperty("--field-x", `${clientX - fieldRect.left}px`);
      field.style.setProperty("--field-y", `${clientY - fieldRect.top}px`);
    };

    const detectClues = () => {
      const radius = field.clientWidth < 520 ? 72 : 110;
      let changed = false;
      clueRefs.current.forEach((element, index) => {
        if (!element) return;
        const id = clues[index].id;
        if (found.current.has(id)) return;
        const rect = element.getBoundingClientRect();
        const dx = light.x - (rect.left + rect.width / 2);
        const dy = light.y - (rect.top + rect.height / 2);
        if (Math.hypot(dx, dy) < radius) {
          found.current.add(id);
          changed = true;
        }
      });
      if (changed) setFoundIds(Array.from(found.current));
    };

    const sweep = (now: number) => {
      const idle = now - lastPointer > 5000;
      if (!pointerActive || idle || !canHover.matches) {
        pointerActive = false;
        const rect = field.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const t = (now - start) / 1000;
          const x = rect.left + rect.width * (0.5 + 0.38 * Math.sin(t * 0.43));
          const y =
            rect.top + rect.height * (0.5 + 0.36 * Math.sin(t * 0.71 + 1.2));
          applyLight(x, y);
          detectClues();
        }
      }
      frame = requestAnimationFrame(sweep);
    };

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerActive = true;
      lastPointer = performance.now();
      applyLight(event.clientX, event.clientY);
      detectClues();
      setHasMoved(true);
    };

    if (reducedMotion) {
      clues.forEach((clue) => found.current.add(clue.id));
      const rect = field.getBoundingClientRect();
      applyLight(rect.left + rect.width / 2, rect.top + rect.height / 2);
      frame = requestAnimationFrame(() =>
        setFoundIds(Array.from(found.current)),
      );
      return () => cancelAnimationFrame(frame);
    }

    hero.addEventListener("pointermove", handlePointer);
    frame = requestAnimationFrame(sweep);
    return () => {
      hero.removeEventListener("pointermove", handlePointer);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      id="top"
      className={`room-hero ${cleared ? "is-cleared" : ""} ${
        reducedMotion ? "is-static" : ""
      }`}
      aria-labelledby="room-title"
    >
      <div className="room-grain" aria-hidden="true" />
      <div className="room-light" aria-hidden="true" />
      <div className="room-scanlines" aria-hidden="true" />

      <div className="room-hud" aria-hidden="true">
        <span className="room-hud-corner is-tl" />
        <span className="room-hud-corner is-tr" />
        <span className="room-hud-corner is-bl" />
        <span className="room-hud-corner is-br" />
        <p className="room-hud-feed">
          <span className="room-rec" /> CAM 01 <em>Room: Portfolio</em>
        </p>
        <div className="room-hud-clues">
          <span>{cleared ? "Room cleared" : "Clues found"}</span>
          <span className="room-pips">
            {clues.map((clue) => (
              <i
                key={clue.id}
                className={foundIds.includes(clue.id) ? "is-found" : ""}
              />
            ))}
          </span>
          <strong>
            {foundIds.length}/{clues.length}
          </strong>
        </div>
        <p className="room-hud-location">Maryland, USA · 39.41°N</p>
      </div>

      <div className="room-layout">
        <div className="room-copy">
          <motion.p
            className="room-kicker"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            Matthew Mercado{" "}
            <span>Full-stack engineer · AI agents &amp; developer tools</span>
          </motion.p>

          <h1
            id="room-title"
            aria-label="I build full-stack software for the real world."
          >
            {["I build full-stack", "software for"].map((line, index) => (
              <span key={line} className="room-line" aria-hidden="true">
                <motion.span
                  initial={reducedMotion ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.2 + index * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="room-line" aria-hidden="true">
              <motion.span
                className="room-word"
                initial={reducedMotion ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
              >
                <ScrambledWord enabled={!reducedMotion} />
                <i className="room-caret" />
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="room-intro"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.65 }}
          >
            Nine years of shipping web apps, AI agent tooling, and the hardware
            behind live experiences, for defense teams, escape rooms, and two
            SaaS products of my own. The proof is hidden in this room.{" "}
            {reducedMotion ? (
              <span className="room-hint">The lights are on.</span>
            ) : (
              <>
                <span className="room-hint is-pointer">
                  {hasMoved
                    ? "Keep searching."
                    : "Move your light across the wall to find it."}
                </span>
                <span className="room-hint is-touch">
                  Watch the light sweep the wall.
                </span>
              </>
            )}
          </motion.p>

          <motion.div
            className="room-actions"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.8 }}
          >
            <a className="room-button" href="#work">
              <span>{cleared ? "Unlock the work" : "View selected work"}</span>
              <ArrowDown aria-hidden="true" />
            </a>
            <a className="room-link" href="mailto:matthew@escapedirector.com">
              Start a conversation <ArrowUpRight aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <div ref={fieldRef} className="room-field">
          <svg
            className="room-plan"
            viewBox="0 0 600 640"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect x="20" y="20" width="560" height="600" />
            <path d="M20 250 H210 M270 250 H360 M360 20 V140 M360 200 V430 M360 490 V620 M20 430 H120 M180 430 H360 M360 330 H580" />
            <path
              className="room-plan-door"
              d="M210 250 A60 60 0 0 1 270 190 M360 140 A60 60 0 0 1 420 200 M120 430 A60 60 0 0 0 180 370 M360 430 A60 60 0 0 0 420 490"
            />
            <text x="340" y="236" textAnchor="end">
              LOBBY
            </text>
            <text x="562" y="316" textAnchor="end">
              CONTROL
            </text>
            <text x="340" y="416" textAnchor="end">
              ROOM 01
            </text>
            <text x="44" y="460">
              EXIT
            </text>
            <circle cx="470" cy="250" r="26" />
            <path d="M458 250 h24 M470 238 v24" />
          </svg>

          <div className="room-uv" aria-hidden="true">
            <svg
              className="room-plan room-plan-lit"
              viewBox="0 0 600 640"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect x="20" y="20" width="560" height="600" />
              <path d="M20 250 H210 M270 250 H360 M360 20 V140 M360 200 V430 M360 490 V620 M20 430 H120 M180 430 H360 M360 330 H580" />
            </svg>
            {clues.map((clue, index) => (
              <div
                key={clue.id}
                ref={(element) => {
                  clueRefs.current[index] = element;
                }}
                className={`room-clue is-${clue.id}`}
              >
                <small>{clue.label}</small>
                <strong>{clue.value}</strong>
                <span>{clue.note}</span>
              </div>
            ))}
          </div>

          <div className="room-found" aria-hidden="true">
            {clues.map((clue) => (
              <div
                key={clue.id}
                className={`room-clue is-${clue.id} ${
                  foundIds.includes(clue.id) ? "is-found" : ""
                }`}
              >
                <small>{clue.label}</small>
                <strong>{clue.value}</strong>
                <span>{clue.note}</span>
              </div>
            ))}
          </div>

          <div className="room-beam" aria-hidden="true" />
        </div>

        <ul className="sr-only">
          {clues.map((clue) => (
            <li key={clue.id}>
              {clue.label}: {clue.value}, {clue.note}.
            </li>
          ))}
        </ul>
      </div>

      <a className="room-scroll" href="#work">
        <span>Open the case files</span>
        <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
