'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';

const BOOT_MESSAGES = [
  { text: '[  0.042s]  Starting development environment...', delay: 300 },
  { text: '[  1.284s]  npm ci: 847 packages — 0 vulnerabilities  [OK]', delay: 1000 },
  { text: '[  2.847s]  tsc: 63 source files checked — 0 errors  [OK]', delay: 1750 },
  { text: '[  3.219s]  next.js 15: /app compiled in 371ms  [OK]', delay: 2450 },
];

const FIRST_NAME = 'MATTHEW'.split('');
const LAST_NAME  = 'MERCADO'.split('');
const TITLE_CHARS = 'SOFTWARE  ENGINEER'.split('');

const NAME_STAGGER     = 0.055;
const FIRST_NAME_START = 0.15;
const LAST_NAME_START  = FIRST_NAME_START + FIRST_NAME.length * NAME_STAGGER + 0.12;
const TITLE_START      = LAST_NAME_START  + LAST_NAME.length  * NAME_STAGGER + 0.35;
const NAME_DONE_AT     = LAST_NAME_START  + LAST_NAME.length  * NAME_STAGGER + 0.4;

interface LogMessage {
  text: string;
  time: string;
  type: 'system' | 'input' | 'warn' | 'info';
}

function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

function NameLetter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: '0.4em', filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'inline-block' }}
    >
      {char}
    </motion.span>
  );
}

export default function BootSequence() {
  const [logs, setLogs]                 = useState<LogMessage[]>([]);
  const [phase, setPhase]               = useState<number>(0);
  const [inputValue, setInputValue]     = useState('');
  const [bootProgress, setBootProgress] = useState(0);
  const [showCursor, setShowCursor]     = useState(false);
  const router    = useRouter();
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((text: string, type: LogMessage['type'] = 'system') => {
    setLogs((prev) => [...prev, { text, time: getTimestamp(), type }]);
  }, []);

  // Auto-scroll terminal to bottom on new logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Reveal blinking cursor after name finishes
  useEffect(() => {
    const t = setTimeout(() => setShowCursor(true), NAME_DONE_AT * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    if (phase === 0) {
      BOOT_MESSAGES.forEach((msg, index) => {
        const t = setTimeout(() => {
          addLog(msg.text, 'system');
          setBootProgress(((index + 1) / BOOT_MESSAGES.length) * 80);
          if (index === BOOT_MESSAGES.length - 1) {
            setTimeout(() => setPhase(1), 700);
          }
        }, msg.delay);
        timeouts.push(t);
      });
    } else if (phase === 1) {
      const t1 = setTimeout(() => { addLog('Scanning visitor credentials...', 'system'); setBootProgress(90); }, 400);
      const t2 = setTimeout(() => setPhase(2), 1400);
      timeouts.push(t1, t2);
    } else if (phase === 3) {
      const t1 = setTimeout(() => { addLog('WARNING: Unregistered visitor detected', 'warn'); }, 400);
      const t2 = setTimeout(() => { addLog('Role: GUEST  •  Clearance: VIEWER  •  Session: TEMPORARY', 'warn'); }, 1100);
      const t3 = setTimeout(() => { addLog('Portfolio access: GRANTED  •  Explore freely', 'info'); setBootProgress(100); }, 1800);
      const t4 = setTimeout(() => setPhase(4), 2500);
      timeouts.push(t1, t2, t3, t4);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [phase, addLog]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    setInputValue('');

    if (cmd === '') return;
    addLog(`> ${cmd}`, 'input');

    if (cmd === 'enter' || cmd === 'start' || cmd === 'open' || cmd === 'explore') {
      addLog('Launching portfolio interface...', 'system');
      addLog('Mounting project modules... done', 'system');
      setTimeout(() => {
        sessionStorage.setItem('booted', 'true');
        router.push('/hub');
      }, 1600);
    } else if (cmd === 'help') {
      addLog('Available commands:', 'info');
      addLog('  explore  —  Open the portfolio', 'info');
      addLog('  whoami   —  About this developer', 'info');
      addLog('  ls       —  List portfolio sections', 'info');
      addLog('  skills   —  View tech stack', 'info');
      addLog('  status   —  Current availability', 'info');
      addLog('  clear    —  Clear terminal output', 'info');
      addLog('  help     —  Show this message', 'info');
    } else if (cmd === 'whoami') {
      addLog('Resolving identity...', 'system');
      setTimeout(() => addLog('Matthew Mercado  •  Software Engineer & Web Developer', 'info'), 400);
      setTimeout(() => addLog('Specializes in full-stack web apps and interactive interfaces', 'info'), 800);
      setTimeout(() => addLog('Type "explore" to view the full portfolio.', 'info'), 1200);
    } else if (cmd === 'ls') {
      addLog('Listing portfolio root...', 'system');
      setTimeout(() => addLog('drwxr-xr-x  projects/   [6 entries]', 'info'), 350);
      setTimeout(() => addLog('drwxr-xr-x  skills/     [TypeScript, React, Next.js ...]', 'info'), 550);
      setTimeout(() => addLog('drwxr-xr-x  contact/    [1 entry]', 'info'), 750);
      setTimeout(() => addLog('-rw-r--r--  README.md   [currently reading this]', 'info'), 950);
      setTimeout(() => addLog('Type "explore" to enter the system.', 'info'), 1300);
    } else if (cmd === 'skills') {
      addLog('Loading tech stack...', 'system');
      setTimeout(() => addLog('LANGUAGES:   TypeScript  JavaScript  HTML/CSS', 'info'), 350);
      setTimeout(() => addLog('FRAMEWORKS:  React  Next.js  Node.js  Tailwind CSS', 'info'), 700);
      setTimeout(() => addLog('TOOLS:       Git  PostgreSQL  Prisma  Vercel  Docker', 'info'), 1050);
      setTimeout(() => addLog('INTERESTS:   Web performance  UI/UX  Creative coding', 'info'), 1400);
    } else if (cmd === 'status') {
      addLog('Fetching current status...', 'system');
      setTimeout(() => addLog('AVAILABILITY:  OPEN  •  Actively seeking opportunities', 'info'), 350);
      setTimeout(() => addLog('STACK:         Full-stack  •  TypeScript / React / Next.js', 'info'), 750);
      setTimeout(() => addLog('PROJECTS:      6 in portfolio  •  2 currently active', 'info'), 1150);
    } else if (cmd === 'clear' || cmd === 'cls') {
      setLogs([]);
    } else if (cmd === 'login') {
      addLog('Guest access is already active. Try "explore" instead.', 'info');
    } else {
      addLog(`Command not found: ${cmd}`, 'warn');
      addLog('Type "help" for available commands.', 'info');
    }
  };

  const getLogColor = (type: LogMessage['type']) => {
    switch (type) {
      case 'warn':  return 'text-error-red/90';
      case 'info':  return 'text-neon-blue/75';
      case 'input': return 'text-neon-green';
      default:      return 'text-zinc-500';
    }
  };

  return (
    <div
      className="h-screen bg-background circuit-grid flex flex-col overflow-hidden"
      style={{ fontFamily: 'var(--font-terminal)' }}
    >
      {/* ── HERO — fixed at top, never moves ───────────────────── */}
      <div className="shrink-0 px-6 sm:px-12 md:px-16 pt-10 sm:pt-14 pb-6 sm:pb-8 select-none">

        <div
          className="font-black leading-none tracking-[0.08em] glow-text-amber"
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 'clamp(2.2rem, 8vw, 5.5rem)',
            color: 'var(--color-neon-amber)',
          }}
        >
          {FIRST_NAME.map((char, i) => (
            <NameLetter key={i} char={char} delay={FIRST_NAME_START + i * NAME_STAGGER} />
          ))}
        </div>

        <div
          className="font-black leading-none tracking-[0.08em] -mt-[0.06em]"
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 'clamp(2.2rem, 8vw, 5.5rem)',
            color: 'rgba(255,184,0,0.35)',
          }}
        >
          {LAST_NAME.map((char, i) => (
            <NameLetter key={i} char={char} delay={LAST_NAME_START + i * NAME_STAGGER} />
          ))}
          <AnimatePresence>
            {showCursor && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.48, 0.5, 0.98] }}
                style={{
                  display: 'inline-block',
                  marginLeft: '0.12em',
                  fontSize: '0.85em',
                  color: 'var(--color-neon-amber)',
                }}
              >
                █
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
          <div
            className="tracking-[0.35em] uppercase text-zinc-500"
            style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
          >
            {TITLE_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: TITLE_START + i * 0.038, duration: 0.1 }}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: TITLE_START + TITLE_CHARS.length * 0.038 + 0.15, duration: 0.4 }}
            className="flex items-center gap-2 text-xs tracking-widest"
            style={{ color: 'rgba(255,184,0,0.5)' }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: 'var(--color-neon-amber)',
                boxShadow: '0 0 6px var(--color-neon-amber)',
                animation: 'pulseRing 2.5s ease-out infinite',
              }}
            />
            AVAILABLE
          </motion.div>
        </div>

        {/* Divider rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: TITLE_START + TITLE_CHARS.length * 0.038 + 0.3,
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 h-px origin-left"
          style={{
            background: 'linear-gradient(to right, rgba(255,184,0,0.4) 0%, rgba(255,184,0,0.08) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* ── TERMINAL — scrollable, fills remaining height ───────── */}
      <div className="flex-1 flex flex-col overflow-hidden px-6 sm:px-12 md:px-16 pb-6">

        {/* Progress bar — shrinks away when done */}
        <AnimatePresence>
          {phase <= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="shrink-0 mb-4"
            >
              <div className="flex justify-between text-[10px] font-mono mb-1.5">
                <span style={{ color: 'rgba(255,184,0,0.35)' }}>BOOT SEQUENCE</span>
                <span style={{ color: 'rgba(255,184,0,0.35)' }}>{Math.round(bootProgress)}%</span>
              </div>
              <div className="h-[2px] bg-white/[0.04] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  animate={{ width: `${bootProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ background: 'var(--color-neon-amber)', boxShadow: '0 0 14px rgba(255,184,0,0.7)' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable log area */}
        <div className="flex-1 overflow-y-auto space-y-[3px] pb-2" style={{ scrollbarWidth: 'none' }}>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className={`flex gap-4 text-xs sm:text-[0.8rem] leading-relaxed font-mono ${getLogColor(log.type)}`}
            >
              <span className="text-zinc-700 shrink-0 tabular-nums">{log.time}</span>
              <span>{log.text}</span>
            </motion.div>
          ))}

          {/* ACCESS DENIED */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onAnimationComplete={() => setTimeout(() => setPhase(3), 1200)}
                className="py-4"
              >
                <motion.div
                  animate={{
                    x: [0, -5, 7, -4, 5, 0],
                    filter: [
                      'hue-rotate(0deg) brightness(1)',
                      'hue-rotate(-50deg) brightness(1.3)',
                      'hue-rotate(50deg) brightness(1.3)',
                      'hue-rotate(0deg) brightness(1)',
                    ],
                  }}
                  transition={{
                    x: { duration: 0.12, times: [0, 0.2, 0.4, 0.6, 0.8, 1], repeat: 5, repeatDelay: 0.7 },
                    filter: { duration: 0.12, repeat: 5, repeatDelay: 0.7 },
                  }}
                  className="text-xl sm:text-3xl md:text-4xl font-black tracking-[0.2em] text-error-red glow-text-red"
                  style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                  ✕ ACCESS DENIED
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-error-red/40 text-xs font-mono mt-1.5 tracking-widest"
                >
                  CREDENTIAL MISMATCH — GUEST SESSION FALLBACK INITIATED
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={logEndRef} />
        </div>

        {/* Terminal input — pinned to bottom */}
        {phase === 4 && (
          <motion.form
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleCommand}
            className="shrink-0 flex items-center gap-3 pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span
              className="shrink-0 text-xs sm:text-sm tracking-wider select-none"
              style={{ color: 'rgba(255,184,0,0.55)', fontFamily: 'var(--font-terminal)' }}
            >
              <span style={{ color: 'var(--color-neon-amber)' }}>▶</span> guest@m-mercado
              <span className="text-zinc-600">:~$</span>
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-neon-green placeholder-neon-green/20 text-sm font-mono"
              placeholder="type 'help' to list commands"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            {inputValue === '' && (
              <span className="text-neon-green/70 animate-pulse text-base leading-none">█</span>
            )}
          </motion.form>
        )}
      </div>
    </div>
  );
}
