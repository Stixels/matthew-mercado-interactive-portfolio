"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import {
  portfolioProjects,
  getProjectById,
  puzzleProjects,
} from "@/content/portfolio";

// ─── Derived data (module-level, stays in sync with portfolio content) ─────────

const contactProject = getProjectById("contact");
const lockedProjects = portfolioProjects.filter((p) => p.puzzleType !== null);
const publicProjects = portfolioProjects.filter((p) => p.puzzleType === null);
const lockedCount = lockedProjects.length;
const publicCount = publicProjects.length;

const BOOT_MESSAGES = [
  { text: "portfolio — system ready  [  OK  ]", delay: 30 },
  {
    text: `${portfolioProjects.length} projects — ${lockedCount} encrypted — ${publicCount} public  [  OK  ]`,
    delay: 280,
  },
];

interface FSEntry {
  perms: string;
  name: string;
  type: "d" | "f";
  info?: string;
  locked?: boolean;
}

// ─── Virtual filesystem — generated from portfolio data ────────────────────────

function buildVirtualFS(): Record<string, FSEntry[]> {
  const fs: Record<string, FSEntry[]> = {
    "~": [
      {
        perms: "drwxr-xr-x",
        name: "projects",
        type: "d",
        info: `${portfolioProjects.length} entries · ${lockedCount} encrypted`,
      },
      {
        perms: "drwxr-xr-x",
        name: "puzzles",
        type: "d",
        info: `${lockedCount} decryption sequences`,
      },
      { perms: "drwxr-xr-x", name: "about", type: "d", info: "public" },
      { perms: "-rw-r--r--", name: "README.md", type: "f", info: "start here" },
    ],
    "~/projects": portfolioProjects.map((proj) => ({
      perms: proj.puzzleType !== null ? "dr-x------" : "drwxr-xr-x",
      name: proj.id,
      type: "d" as const,
      info:
        proj.puzzleType !== null
          ? `${proj.hubTitle ?? proj.title}  [LOCKED]`
          : `${proj.title}  [${proj.tag} · public]`,
      ...(proj.puzzleType !== null && { locked: true }),
    })),
    "~/puzzles": puzzleProjects.map((proj) => ({
      perms: "drwxr-xr-x",
      name: proj.puzzleType!,
      type: "d" as const,
      info: `unlocks: projects/${proj.id}/`,
    })),
    "~/about": [
      {
        perms: "-rw-r--r--",
        name: "README.md",
        type: "f",
        info: `${contactProject?.role ?? "full-stack engineer"} — public`,
      },
    ],
  };

  // Per-project sub-directories
  portfolioProjects.forEach((proj) => {
    if (proj.puzzleType !== null) {
      fs[`~/projects/${proj.id}`] = [
        {
          perms: "-r--------",
          name: "case-study.md",
          type: "f",
          info: `LOCKED — solve ~/puzzles/${proj.puzzleType}/`,
          locked: true,
        },
      ];
    } else if (proj.id === "contact") {
      fs[`~/projects/${proj.id}`] = [
        {
          perms: "-rw-r--r--",
          name: "profile.md",
          type: "f",
          info: "About & contact — public",
        },
      ];
    } else {
      fs[`~/projects/${proj.id}`] = [
        {
          perms: "-rw-r--r--",
          name: "case-study.md",
          type: "f",
          info: proj.overview.slice(0, 55) + "…",
        },
        {
          perms: "-rw-r--r--",
          name: "stack.txt",
          type: "f",
          info: proj.stack.slice(0, 4).join(" · "),
        },
      ];
    }
  });

  return fs;
}

const VIRTUAL_FS = buildVirtualFS();

// ─── File contents — derived from project data ─────────────────────────────────

function buildFileContents(): Record<string, string[]> {
  const contents: Record<string, string[]> = {
    "~/README.md": [
      "# Matthew Mercado — Interactive Portfolio",
      "",
      "Welcome. You have read-only guest access.",
      "",
      "  explore         enter the portfolio",
      "  ls              list directory",
      "  cd <dir>        change directory",
      "  cat <file>      read a file",
      "  help            all commands",
    ],
    "~/about/README.md": [
      `# ${contactProject?.title ?? "Matthew Mercado"}`,
      "",
      `Role:     ${contactProject?.role ?? "Full-Stack Engineer"}`,
      `Status:   Open to new opportunities`,
      "",
      contactProject?.overview ?? "",
      "",
      'Run "explore" to view full profile.',
    ],
  };

  portfolioProjects.forEach((proj) => {
    if (proj.puzzleType !== null) return;

    if (proj.id === "contact") {
      contents[`~/projects/${proj.id}/profile.md`] = [
        `# ${proj.title}`,
        "",
        `Role:      ${proj.role}`,
        `Timeline:  ${proj.timeline}`,
        "",
        proj.overview,
        "",
        'Run "explore" to view full profile.',
      ];
    } else {
      contents[`~/projects/${proj.id}/case-study.md`] = [
        `# ${proj.title}`,
        "",
        proj.overview,
        "",
        `Stack:   ${proj.stack.join(" · ")}`,
        `Role:    ${proj.role}`,
        `Status:  ${proj.status}`,
        "",
        'Run "explore" to view the full case study.',
      ];
      contents[`~/projects/${proj.id}/stack.txt`] = [proj.stack.join("  ")];
    }
  });

  return contents;
}

const FILE_CONTENTS = buildFileContents();

// ─── Locked paths — derived from projects with puzzles ────────────────────────

const LOCKED_PATHS = new Set(
  portfolioProjects
    .filter((p) => p.puzzleType !== null)
    .map((p) => `~/projects/${p.id}/case-study.md`),
);

function resolvePath(cwd: string, arg: string): string {
  const trimmed = arg.replace(/\/$/, "");
  if (!trimmed || trimmed === "~") return "~";
  if (trimmed === "..") {
    const lastSlash = cwd.lastIndexOf("/");
    return lastSlash <= 1 ? "~" : cwd.slice(0, lastSlash);
  }
  if (trimmed.startsWith("~/")) return trimmed;
  return cwd === "~" ? `~/${trimmed}` : `${cwd}/${trimmed}`;
}

// Highlight [  OK  ] / [  FAIL  ] in boot log lines
function LogLine({ text, type }: { text: string; type: LogMessage["type"] }) {
  if (type === "system" && text.includes("[  OK  ]")) {
    const idx = text.lastIndexOf("[  OK  ]");
    return (
      <>
        <span>{text.slice(0, idx)}</span>
        <span style={{ color: "rgba(114,239,221,0.85)" }}>[ OK ]</span>
      </>
    );
  }
  if (type === "system" && text.includes("[  FAIL  ]")) {
    const idx = text.lastIndexOf("[  FAIL  ]");
    return (
      <>
        <span>{text.slice(0, idx)}</span>
        <span style={{ color: "rgba(255,77,109,0.9)" }}>[ FAIL ]</span>
      </>
    );
  }
  return <span>{text}</span>;
}

const FIRST_NAME = "MATTHEW".split("");
const LAST_NAME = "MERCADO".split("");

// Derive title words from contact role: "Full-Stack Engineer & Designer" → FULL-STACK / ENGINEER
const _roleParts = (contactProject?.role ?? "Full-Stack Engineer")
  .split(/[\s&]+/)
  .filter(Boolean);
const TITLE_WORD1 = (_roleParts[0]?.toUpperCase() ?? "FULL-STACK").split("");
const TITLE_WORD2 = (_roleParts[1]?.toUpperCase() ?? "ENGINEER").split("");

// Tagline from first 3 non-meta project subtitles (no duplication with whoami)
const _fmtSub = (s: string) =>
  s
    .split(" ")
    .map((w) =>
      w === "SAAS"
        ? "SaaS"
        : w === "VR"
          ? "VR"
          : w.charAt(0) + w.slice(1).toLowerCase(),
    )
    .join(" ");

const NAME_STAGGER = 0.052;
const FIRST_NAME_START = 0.12;
const LAST_NAME_START =
  FIRST_NAME_START + FIRST_NAME.length * NAME_STAGGER + 0.1;
const TITLE_START = LAST_NAME_START + LAST_NAME.length * NAME_STAGGER + 0.28;
const TITLE_WORD2_START = TITLE_START + TITLE_WORD1.length * 0.035 + 0.12;
const TAGLINE_START = TITLE_WORD2_START + TITLE_WORD2.length * 0.035 + 0.2;
const AVAIL_START = TAGLINE_START + 0.35;
const NAME_DONE_AT = LAST_NAME_START + LAST_NAME.length * NAME_STAGGER + 0.4;

interface LogMessage {
  text: string;
  time: string;
  type: "system" | "input" | "warn" | "info" | "ls-entry";
  entry?: FSEntry;
  entryDir?: string;
}

function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

function NameLetter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: "0.4em", filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
}

export default function BootSequence() {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [phase, setPhase] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [bootProgress, setBootProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cwd, setCwd] = useState("~");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [savedInput, setSavedInput] = useState("");

  const router = useRouter();
  const logEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const phaseRef = useRef(0);
  // Sync ref in effect so it's always current inside callbacks without re-render reads
  useEffect(() => {
    phaseRef.current = phase;
  });

  const addLog = useCallback(
    (
      text: string,
      type: LogMessage["type"] = "system",
      entry?: FSEntry,
      entryDir?: string,
    ) => {
      setLogs((prev) => [
        ...prev,
        { text, time: getTimestamp(), type, entry, entryDir },
      ]);
    },
    [],
  );

  const skipBoot = useCallback(() => {
    if (phaseRef.current >= 4) return;
    setBootProgress(100);
    setPhase(4);
  }, []);

  // Enter or Escape skips the boot sequence
  useEffect(() => {
    if (phase >= 4) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") skipBoot();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, skipBoot]);

  // Focus input when terminal becomes interactive
  useEffect(() => {
    if (phase === 4) {
      const t = setTimeout(() => inputRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Auto-scroll on new log lines
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Blinking cursor after name finishes
  useEffect(() => {
    const t = setTimeout(() => setShowCursor(true), NAME_DONE_AT * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    if (phase === 0) {
      BOOT_MESSAGES.forEach((msg, index) => {
        const t = setTimeout(() => {
          if (phaseRef.current !== 0) return;
          addLog(msg.text, "system");
          setBootProgress(((index + 1) / BOOT_MESSAGES.length) * 80);
          if (index === BOOT_MESSAGES.length - 1) {
            const t2 = setTimeout(() => {
              if (phaseRef.current === 0) setPhase(1);
            }, 150);
            timeouts.push(t2);
          }
        }, msg.delay);
        timeouts.push(t);
      });
    } else if (phase === 1) {
      const t1 = setTimeout(() => {
        if (phaseRef.current !== 1) return;
        addLog("Initializing session...", "system");
        setBootProgress(90);
      }, 80);
      const t2 = setTimeout(() => {
        if (phaseRef.current === 1) setPhase(2);
      }, 280);
      timeouts.push(t1, t2);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [phase, addLog]);

  // Phase 3 is isolated in its own effect with a `done` closure so React
  // StrictMode's double-invoke can never fire the log callbacks twice.
  useEffect(() => {
    if (phase !== 3) return;
    let done = false;
    const t1 = setTimeout(() => {
      if (done) return;
      addLog("GUEST session active — type 'explore' to begin", "info");
      setBootProgress(100);
    }, 80);
    const t2 = setTimeout(() => {
      if (done) return;
      done = true;
      setPhase(4);
    }, 320);
    return () => {
      done = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, addLog]);

  // Click handler for interactive ls entries
  const handleLsEntryClick = useCallback(
    (entry: FSEntry, entryDir: string) => {
      if (phaseRef.current !== 4) return;

      if (entry.type === "d") {
        const target = resolvePath(entryDir, entry.name);
        if (target in VIRTUAL_FS) {
          addLog(`guest@m-mercado:${entryDir}$ cd ${entry.name}`, "input");
          setCwd(target);
        }
      } else {
        const resolved =
          entryDir === "~" ? `~/${entry.name}` : `${entryDir}/${entry.name}`;
        addLog(`guest@m-mercado:${entryDir}$ cat ${entry.name}`, "input");
        if (LOCKED_PATHS.has(resolved)) {
          addLog(`cat: ${entry.name}: Permission denied`, "warn");
          addLog(
            "File is encrypted. Solve the corresponding puzzle to decrypt.",
            "info",
          );
        } else if (FILE_CONTENTS[resolved]) {
          FILE_CONTENTS[resolved].forEach((line, i) => {
            setTimeout(() => addLog(line === "" ? " " : line, "info"), i * 35);
          });
        } else {
          addLog(`cat: ${entry.name}: No such file or directory`, "warn");
        }
      }
      inputRef.current?.focus();
    },
    [addLog],
  );

  // Tab completion + command history (↑/↓)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = inputValue.split(/\s+/);
      const verb = parts[0]?.toLowerCase() ?? "";

      if (parts.length === 1 && verb) {
        const cmds = [
          "explore",
          "ls",
          "cd",
          "cat",
          "pwd",
          "whoami",
          "skills",
          "status",
          "uname",
          "clear",
          "help",
          "more",
          "echo",
        ];
        const matches = cmds.filter((c) => c.startsWith(verb));
        if (matches.length === 1) setInputValue(matches[0] + " ");
        else if (matches.length > 1) addLog(matches.join("    "), "info");
      } else if (parts.length === 2) {
        const partial = parts[1];
        const entries = VIRTUAL_FS[cwd] ?? [];
        if (verb === "cd") {
          const matches = entries
            .filter((e) => e.type === "d" && e.name.startsWith(partial))
            .map((e) => e.name);
          if (matches.length === 1) setInputValue(`cd ${matches[0]}`);
          else if (matches.length > 1) addLog(matches.join("    "), "info");
        } else if (verb === "cat") {
          const matches = entries
            .filter((e) => e.type === "f" && e.name.startsWith(partial))
            .map((e) => e.name);
          if (matches.length === 1) setInputValue(`cat ${matches[0]}`);
          else if (matches.length > 1) addLog(matches.join("    "), "info");
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      if (histIdx === -1) setSavedInput(inputValue);
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInputValue(cmdHistory[cmdHistory.length - 1 - next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInputValue(histIdx === -1 ? "" : savedInput);
        return;
      }
      const next = histIdx - 1;
      setHistIdx(next);
      setInputValue(cmdHistory[cmdHistory.length - 1 - next]);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputValue.trim();
    const parts = raw.split(/\s+/);
    const verb = parts[0]?.toLowerCase() ?? "";
    const arg1 = parts[1] ?? "";
    setInputValue("");
    setHistIdx(-1);
    setSavedInput("");

    if (raw === "") return;

    // Track history (skip duplicates at top)
    setCmdHistory((prev) => {
      if (prev[prev.length - 1] === raw) return prev;
      return [...prev, raw];
    });

    addLog(`guest@m-mercado:${cwd}$ ${raw}`, "input");

    if (
      verb === "enter" ||
      verb === "start" ||
      verb === "open" ||
      verb === "explore"
    ) {
      addLog("Authenticating session...", "system");
      setTimeout(
        () => addLog("Launching portfolio interface...", "system"),
        300,
      );
      setTimeout(() => {
        sessionStorage.setItem("booted", "true");
        router.push("/hub");
      }, 800);
    } else if (verb === "pwd") {
      addLog(cwd.replace("~", "/home/guest"), "info");
    } else if (verb === "uname") {
      addLog(
        "Linux m-mercado-portfolio 6.6.0 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
        "info",
      );
    } else if (verb === "echo") {
      addLog(parts.slice(1).join(" "), "info");
    } else if (verb === "help") {
      addLog("  explore  —  enter the portfolio", "info");
      addLog('Type "more" for all commands.', "info");
    } else if (verb === "more") {
      addLog("Available commands:", "info");
      addLog("  explore         enter the portfolio interface", "info");
      addLog("  ls              list current directory", "info");
      addLog(
        "  cd <dir>        change directory  (Tab to autocomplete)",
        "info",
      );
      addLog("  cat <file>      read a file  (Tab to autocomplete)", "info");
      addLog("  pwd             print working directory", "info");
      addLog("  whoami          identity record", "info");
      addLog("  skills          tech stack manifest", "info");
      addLog("  status          availability & active builds", "info");
      addLog("  uname           system information", "info");
      addLog("  clear           clear terminal output", "info");
      addLog("  ↑ / ↓          navigate command history", "info");
    } else if (verb === "whoami") {
      addLog("Resolving identity record...", "system");
      setTimeout(
        () =>
          addLog(
            `${contactProject?.title ?? "Matthew Mercado"}  ·  ${contactProject?.role ?? "Full-Stack Engineer"}`,
            "info",
          ),
        250,
      );
      setTimeout(
        () => addLog(contactProject?.overview?.split(".")[0] ?? "", "info"),
        500,
      );
      const activeTitle = portfolioProjects.find(
        (p) => p.status === "ACTIVE",
      )?.title;
      setTimeout(
        () =>
          addLog(
            `Currently: ${activeTitle ? `Founder @ ${activeTitle}` : "Open to work"}  ·  Open to new opportunities`,
            "info",
          ),
        750,
      );
    } else if (verb === "ls") {
      const entries = VIRTUAL_FS[cwd];
      if (!entries) {
        addLog(`ls: cannot access '${cwd}': No such file or directory`, "warn");
      } else {
        addLog(`total ${entries.length * 8}`, "info");
        const snapshot = cwd;
        entries.forEach((entry, i) => {
          setTimeout(
            () => {
              setLogs((prev) => [
                ...prev,
                {
                  text: "",
                  time: getTimestamp(),
                  type: "ls-entry",
                  entry,
                  entryDir: snapshot,
                },
              ]);
            },
            i * 70 + 60,
          );
        });
      }
    } else if (verb === "cd") {
      const target = resolvePath(cwd, arg1 || "~");
      if (target in VIRTUAL_FS) {
        setCwd(target);
      } else {
        addLog(`bash: cd: ${arg1}: No such file or directory`, "warn");
        addLog('Run "ls" to see available directories.', "info");
      }
    } else if (verb === "cat") {
      if (!arg1) {
        addLog("Usage: cat <filename>", "warn");
      } else {
        const resolved = arg1.startsWith("~/")
          ? arg1
          : cwd === "~"
            ? `~/${arg1}`
            : `${cwd}/${arg1}`;
        if (LOCKED_PATHS.has(resolved)) {
          addLog(`cat: ${arg1}: Permission denied`, "warn");
          addLog(
            "File is encrypted. Solve the corresponding puzzle to decrypt.",
            "info",
          );
        } else if (resolved in VIRTUAL_FS) {
          addLog(`cat: ${arg1}: Is a directory`, "warn");
        } else if (FILE_CONTENTS[resolved]) {
          FILE_CONTENTS[resolved].forEach((line, i) => {
            setTimeout(() => addLog(line === "" ? " " : line, "info"), i * 35);
          });
        } else {
          addLog(`cat: ${arg1}: No such file or directory`, "warn");
        }
      }
    } else if (verb === "skills") {
      const projectStack = [
        ...new Set(portfolioProjects.flatMap((p) => p.stack)),
      ].sort();
      addLog("Loading capability manifest...", "system");
      setTimeout(
        () =>
          addLog(
            "── DEPLOYED IN PROJECTS ─────────────────────────────────",
            "info",
          ),
        180,
      );
      setTimeout(() => addLog(projectStack.join("  "), "info"), 360);
      setTimeout(
        () =>
          addLog(
            "── LANGUAGES ────────────────────────────────────────────",
            "info",
          ),
        560,
      );
      setTimeout(
        () =>
          addLog(
            "TypeScript  JavaScript  Python  Java  C++  SQL  HTML/CSS",
            "info",
          ),
        740,
      );
      setTimeout(
        () =>
          addLog(
            "── TOOLING & INFRA ──────────────────────────────────────",
            "info",
          ),
        940,
      );
      setTimeout(
        () =>
          addLog(
            "Git  Vitest  Playwright  Redux  Zustand  Docker  Linux",
            "info",
          ),
        1120,
      );
      setTimeout(
        () => addLog("AWS S3  Heroku  Vite  Tailwind v4  MUI", "info"),
        1300,
      );
    } else if (verb === "status") {
      const deployedTitles = portfolioProjects
        .filter(
          (p) =>
            ["ACTIVE", "DEPLOYED"].includes(p.status) && p.id !== "contact",
        )
        .map((p) => p.title)
        .join("  ·  ");
      addLog("Querying system status...", "system");
      setTimeout(
        () =>
          addLog(
            "AVAILABILITY:   OPEN — actively seeking new opportunities",
            "info",
          ),
        200,
      );
      setTimeout(
        () => addLog(`ACTIVE BUILDS:  ${deployedTitles}`, "info"),
        450,
      );
      setTimeout(
        () =>
          addLog(
            `CASE STUDIES:   ${portfolioProjects.length - 1} projects  ·  ${lockedCount} require puzzle completion`,
            "info",
          ),
        700,
      );
      setTimeout(
        () =>
          addLog(
            `STACK:          TypeScript  ·  React / Next.js 16  ·  PostgreSQL`,
            "info",
          ),
        950,
      );
    } else if (verb === "clear" || verb === "cls") {
      setLogs([]);
    } else if (verb === "login") {
      addLog('Guest access is already active. Try "explore" instead.', "info");
    } else if (verb === "exit" || verb === "quit") {
      addLog('logout: Type "explore" to enter the portfolio.', "system");
    } else {
      addLog(`bash: ${verb}: command not found`, "warn");
      addLog('Type "help" to get started or "more" for all commands.', "info");
    }
  };

  const getLogColor = (type: LogMessage["type"]) => {
    switch (type) {
      case "warn":
        return "text-error-red/90";
      case "info":
        return "text-neon-blue/75";
      case "input":
        return "text-neon-amber/80";
      default:
        return "text-zinc-500";
    }
  };

  return (
    <div
      className="h-screen bg-background circuit-grid flex flex-col overflow-hidden"
      style={{ fontFamily: "var(--font-terminal)" }}
    >
      {/* ── HERO ───────────────────────────────────────────────── */}
      <div className="shrink-0 px-6 sm:px-12 md:px-16 pt-10 sm:pt-14 pb-4 sm:pb-6 select-none">
        {/* MATTHEW */}
        <div
          className="font-black leading-none tracking-[0.08em]"
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
            color: "var(--color-neon-amber)",
            textShadow: "0 0 40px rgba(255,184,0,0.25)",
          }}
        >
          {FIRST_NAME.map((char, i) => (
            <NameLetter
              key={i}
              char={char}
              delay={FIRST_NAME_START + i * NAME_STAGGER}
            />
          ))}
        </div>

        {/* MERCADO */}
        <div
          className="font-black leading-none tracking-[0.08em] -mt-[0.05em]"
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
            color: "rgba(255,184,0,0.28)",
          }}
        >
          {LAST_NAME.map((char, i) => (
            <NameLetter
              key={i}
              char={char}
              delay={LAST_NAME_START + i * NAME_STAGGER}
            />
          ))}
          <AnimatePresence>
            {showCursor && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  times: [0, 0.46, 0.5, 0.96],
                }}
                style={{
                  display: "inline-block",
                  marginLeft: "0.1em",
                  fontSize: "0.8em",
                  color: "rgba(255,184,0,0.6)",
                }}
              >
                █
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Title row: two-tone */}
        <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1">
          {/* WORD1 — muted */}
          <div
            className="tracking-[0.35em] uppercase"
            style={{
              fontSize: "clamp(0.58rem, 1.4vw, 0.72rem)",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            {TITLE_WORD1.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: TITLE_START + i * 0.035, duration: 0.08 }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          {/* Separator space */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: TITLE_WORD2_START - 0.1 }}
            className="inline-block w-2"
          />
          {/* WORD2 — neon accent */}
          <div
            className="tracking-[0.35em] uppercase"
            style={{
              fontSize: "clamp(0.58rem, 1.4vw, 0.72rem)",
              color: "rgba(76,201,240,0.55)",
            }}
          >
            {TITLE_WORD2.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: TITLE_WORD2_START + i * 0.035,
                  duration: 0.08,
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* AVAILABLE pill */}
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: AVAIL_START, duration: 0.4 }}
            className="ml-4 flex items-center gap-1.5 text-[10px] tracking-widest"
            style={{ color: "rgba(255,184,0,0.45)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--color-neon-amber)",
                boxShadow: "0 0 6px var(--color-neon-amber)",
                animation: "pulseRing 2.5s ease-out infinite",
              }}
            />
            AVAILABLE
          </motion.div>
        </div>

        {/* Gradient rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: AVAIL_START + 0.15,
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 h-px origin-left"
          style={{
            background:
              "linear-gradient(to right, rgba(255,184,0,0.35) 0%, rgba(255,184,0,0.06) 45%, transparent 75%)",
          }}
        />
      </div>

      {/* ── TERMINAL WINDOW ────────────────────────────────────── */}
      <div
        className="flex-1 mx-6 sm:mx-12 md:mx-16 mb-6 flex flex-col overflow-hidden rounded-lg"
        style={{
          border: "1px solid rgba(76,201,240,0.12)",
          background: "rgba(6, 8, 16, 0.65)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 0 0 1px rgba(76,201,240,0.04), 0 0 60px rgba(76,201,240,0.04), 0 24px 48px rgba(0,0,0,0.4)",
        }}
      >
        {/* Title bar */}
        <div
          className="shrink-0 flex items-center gap-3 px-4 h-9"
          style={{
            background: "rgba(10, 13, 22, 0.8)",
            borderBottom: "1px solid rgba(76,201,240,0.07)",
          }}
        >
          {/* Traffic light dots */}
          <div className="flex items-center gap-[5px]">
            <span
              className="w-[11px] h-[11px] rounded-full"
              style={{
                background: "rgba(255,77,109,0.6)",
                boxShadow: "0 0 6px rgba(255,77,109,0.3)",
              }}
            />
            <span
              className="w-[11px] h-[11px] rounded-full"
              style={{
                background: "rgba(255,184,0,0.6)",
                boxShadow: "0 0 6px rgba(255,184,0,0.3)",
              }}
            />
            <span
              className="w-[11px] h-[11px] rounded-full"
              style={{
                background: "rgba(114,239,221,0.6)",
                boxShadow: "0 0 6px rgba(114,239,221,0.3)",
              }}
            />
          </div>

          {/* Session title */}
          <span
            className="flex-1 text-center text-[11px] font-mono tracking-wide"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            portfolio-os — bash — 80×24
          </span>

          {/* Status */}
          <div
            className="flex items-center gap-2 text-[10px] font-mono"
            style={{ color: "rgba(76,201,240,0.35)" }}
          >
            <span>SSH</span>
            <span
              className="w-[5px] h-[5px] rounded-full"
              style={{
                background: "rgba(114,239,221,0.7)",
                boxShadow: "0 0 5px rgba(114,239,221,0.5)",
                animation: "pulseRing 3s ease-out infinite",
              }}
            />
          </div>
        </div>

        {/* Terminal body */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 relative">
          {/* Periodic scan sweep — cyberpunk data-pulse effect */}
          <motion.div
            initial={{ y: "-4px", opacity: 0 }}
            animate={{ y: ["0%", "100%"], opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 10,
              ease: "linear",
              times: [0, 0.05, 0.95, 1],
            }}
            className="absolute left-0 right-0 h-px pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(76,201,240,0.15) 30%, rgba(76,201,240,0.25) 50%, rgba(76,201,240,0.15) 70%, transparent 100%)",
            }}
          />

          {/* Progress bar */}
          <AnimatePresence>
            {phase <= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="shrink-0 mb-4"
              >
                <div className="flex justify-between text-[10px] font-mono mb-1.5">
                  <span style={{ color: "rgba(255,184,0,0.4)" }}>
                    BOOT SEQUENCE
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>
                    {Math.round(bootProgress)}%
                    <span className="ml-3 opacity-50">
                      — press Enter to skip
                    </span>
                  </span>
                </div>
                <div
                  className="h-[2px] relative overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    animate={{ width: `${bootProgress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      background: "var(--color-neon-amber)",
                      boxShadow: "0 0 12px rgba(255,184,0,0.6)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrollable log area */}
          <div
            className="flex-1 overflow-y-auto space-y-0.5 pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.08 }}
                className={`flex gap-3 text-xs sm:text-[0.78rem] leading-relaxed font-mono ${
                  log.type === "ls-entry" ? "" : getLogColor(log.type)
                }`}
              >
                <span className="text-zinc-700 shrink-0 tabular-nums select-none w-[9ch]">
                  {log.time}
                </span>

                {log.type === "ls-entry" && log.entry ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleLsEntryClick(log.entry!, log.entryDir ?? "~")
                    }
                    className={`text-left group flex items-center gap-0 w-full transition-colors rounded px-1 -mx-1 ${
                      phase === 4
                        ? "cursor-pointer hover:bg-white/[0.03]"
                        : "pointer-events-none"
                    }`}
                  >
                    <span className="text-zinc-700 mr-2 shrink-0">
                      {log.entry.perms}
                    </span>
                    <span className="text-zinc-700 mr-2 shrink-0 hidden sm:inline">
                      guest Mar 26{" "}
                    </span>
                    <span
                      className={`shrink-0 transition-colors ${
                        log.entry.locked
                          ? "text-error-red/45"
                          : log.entry.type === "d"
                            ? "group-hover:text-neon-blue text-neon-blue/75"
                            : "group-hover:text-neon-green text-neon-green/70"
                      }`}
                      style={{ minWidth: "18ch" }}
                    >
                      {(log.entry.type === "d"
                        ? `${log.entry.name}/`
                        : log.entry.name
                      ).padEnd(18)}
                    </span>
                    {log.entry.info && (
                      <span
                        className={`ml-2 truncate ${log.entry.locked ? "text-error-red/30" : "text-zinc-600"}`}
                      >
                        # {log.entry.info}
                      </span>
                    )}
                    {phase === 4 && !log.entry.locked && (
                      <span className="ml-auto pl-4 text-[10px] text-neon-blue/0 group-hover:text-neon-blue/30 transition-colors shrink-0 hidden sm:block">
                        {log.entry.type === "d" ? "cd →" : "cat →"}
                      </span>
                    )}
                  </button>
                ) : (
                  <LogLine text={log.text} type={log.type} />
                )}
              </motion.div>
            ))}

            {/* ACCESS DENIED glitch */}
            <AnimatePresence>
              {phase === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onAnimationComplete={() =>
                    setTimeout(() => setPhase((p) => (p === 2 ? 3 : p)), 1000)
                  }
                  className="py-4"
                >
                  <motion.div
                    animate={{
                      x: [0, -4, 6, -4, 0],
                      filter: [
                        "hue-rotate(0deg) brightness(1)",
                        "hue-rotate(-50deg) brightness(1.4)",
                        "hue-rotate(50deg) brightness(1.4)",
                        "hue-rotate(0deg) brightness(1)",
                      ],
                    }}
                    transition={{
                      x: {
                        duration: 0.08,
                        times: [0, 0.25, 0.5, 0.75, 1],
                        repeat: 3,
                        repeatDelay: 0.25,
                      },
                      filter: { duration: 0.08, repeat: 3, repeatDelay: 0.25 },
                    }}
                    className="text-xl sm:text-3xl md:text-4xl font-black tracking-[0.2em] text-error-red glow-text-red"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    ✕ ACCESS DENIED
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-error-red/40 text-xs font-mono mt-1.5 tracking-widest"
                  >
                    CREDENTIAL MISMATCH — GUEST SESSION FALLBACK INITIATED
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={logEndRef} />
          </div>

          {/* Terminal input */}
          {phase === 4 && (
            <motion.form
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleCommand}
              className="shrink-0 flex items-center gap-2 pt-3"
              style={{ borderTop: "1px solid rgba(76,201,240,0.07)" }}
            >
              {/* Segmented prompt — Starship-style */}
              <div className="shrink-0 flex items-center select-none">
                <span
                  className="px-2 py-0.5 text-[11px] font-semibold rounded-l"
                  style={{
                    background: "rgba(76,201,240,0.1)",
                    color: "#4CC9F0",
                    borderRight: "1px solid rgba(76,201,240,0.15)",
                  }}
                >
                  guest
                </span>
                <span
                  className="px-2 py-0.5 text-[11px] rounded-r font-mono"
                  style={{
                    background: "rgba(255,184,0,0.07)",
                    color: "rgba(255,184,0,0.65)",
                  }}
                >
                  {cwd}
                </span>
                <span
                  className="ml-2 text-sm font-bold"
                  style={{ color: "rgba(76,201,240,0.55)" }}
                >
                  ❯
                </span>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-neon-green placeholder-zinc-700 text-sm font-mono"
                placeholder="type 'explore' or 'help'"
                autoComplete="off"
                spellCheck={false}
                style={{
                  caretColor: inputValue
                    ? "var(--color-neon-green)"
                    : "transparent",
                  textShadow: inputValue
                    ? "0 0 8px rgba(114,239,221,0.3)"
                    : "none",
                }}
              />
              {inputValue === "" && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    times: [0, 0.45, 0.5, 0.95],
                  }}
                  className="text-neon-green/60 text-base leading-none shrink-0"
                >
                  █
                </motion.span>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
