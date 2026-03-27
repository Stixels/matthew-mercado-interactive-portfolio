'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { getProjectById, getPuzzleByProjectId } from '@/content/portfolio';
import { useSystemStore } from '@/store/systemStore';

// Per-project accent colors for the nav indicator
const PROJECT_HEX: Record<string, string> = {
  'escape-director':      '#4CC9F0',
  'escape-this-frederick': '#9D4EDD',
  'level-up-vr':           '#72EFDD',
  'hardware':              '#FF4D6D',
  'portfolio':             '#4CC9F0',
  'contact':               '#72EFDD',
};

export default function NavBar() {
  const pathname = usePathname();
  const { accessLevel } = useSystemStore();
  const [scrollPct, setScrollPct] = useState(0);

  const segments = pathname.split('/').filter(Boolean);
  const section  = segments[0];
  const id       = segments[1] ?? '';

  const isHub     = section === 'hub';
  const isProject = section === 'projects';
  const isPuzzle  = section === 'puzzles';
  const isDetail  = isProject || isPuzzle;

  const projectAccentHex = isDetail ? (PROJECT_HEX[id] ?? '#4CC9F0') : '#4CC9F0';

  // Resolve center label for breadcrumb
  let centerLabel = '';
  if (isProject) {
    centerLabel = getProjectById(id)?.title ?? '';
  } else if (isPuzzle) {
    centerLabel = getPuzzleByProjectId(id) ? 'DECRYPT' : '';
  }

  // Reading progress for detail pages
  useEffect(() => {
    if (!isDetail) { setScrollPct(0); return; }
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDetail, pathname]);

  if (pathname === '/') return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      className="fixed top-[10px] left-[10px] right-[10px] h-11 z-[60] flex items-center justify-between px-4 overflow-hidden"
      style={{
        background: 'rgba(3,3,8,0.9)',
        border: '1px solid rgba(76,201,240,0.14)',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        fontFamily: 'var(--font-jetbrains-mono)',
      }}
    >
      {/* Reading progress bar — glows with project accent color */}
      {isDetail && scrollPct > 0 && (
        <div
          className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-100 pointer-events-none"
          style={{
            width: `${scrollPct}%`,
            background: `linear-gradient(to right, ${projectAccentHex}60, ${projectAccentHex}90)`,
            boxShadow: `0 0 8px ${projectAccentHex}60`,
          }}
        />
      )}

      {/* ── Left: Logo / Back ─────────────────────────────────── */}
      <div className="flex items-center shrink-0">
        {/* Mobile: back arrow on detail pages */}
        <Link
          href="/hub"
          className={`${isDetail ? 'flex' : 'hidden'} md:hidden items-center justify-center w-7 h-7 rounded-md border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-white hover:border-white/15 transition-all duration-200 text-xs`}
          aria-label="Back to hub"
        >
          ←
        </Link>

        {/* MM logo */}
        <Link
          href="/hub"
          className={`${isDetail ? 'hidden md:flex' : 'flex'} items-center group`}
          aria-label="Home"
        >
          <span
            className="px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] rounded-l transition-all duration-200 group-hover:brightness-125"
            style={{
              background: 'rgba(76,201,240,0.1)',
              color: '#4CC9F0',
              borderRight: '1px solid rgba(76,201,240,0.16)',
            }}
          >
            M
          </span>
          <span
            className="px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] rounded-r transition-all duration-200 group-hover:brightness-125"
            style={{
              background: 'rgba(76,201,240,0.05)',
              color: 'rgba(76,201,240,0.6)',
            }}
          >
            M
          </span>
        </Link>
      </div>

      {/* ── Center: Nav / Breadcrumb ──────────────────────────── */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-[11px] tracking-[0.12em] uppercase pointer-events-none select-none">

        {isHub && (
          <div className="flex items-center gap-4 pointer-events-auto">
            <Link
              href="/hub"
              className="text-neon-blue/75 hover:text-neon-blue transition-colors duration-150"
            >
              HUB
            </Link>
            <span className="text-white/10">·</span>
            <Link
              href="/projects/contact"
              className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150"
            >
              CONTACT
            </Link>
          </div>
        )}

        {isDetail && (
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Desktop breadcrumb */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/hub"
                className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150"
              >
                HUB
              </Link>
              {centerLabel && (
                <>
                  <span className="text-white/10">/</span>
                  <span
                    className="truncate max-w-[180px]"
                    style={{ color: `${projectAccentHex}70` }}
                  >
                    {centerLabel}
                  </span>
                </>
              )}
            </div>
            {/* Mobile: title only */}
            {centerLabel && (
              <span
                className="md:hidden truncate max-w-[140px] text-[10px]"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {centerLabel}
              </span>
            )}
          </div>
        )}

        {!isHub && !isDetail && (
          <Link
            href="/hub"
            className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150 pointer-events-auto"
          >
            HUB
          </Link>
        )}
      </div>

      {/* ── Right: Access Level ───────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Level bars */}
        <div className="hidden sm:flex items-center gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-2.5 w-0.5 rounded-full transition-all duration-500"
              style={{
                background: i < accessLevel ? 'rgba(157,78,221,0.8)' : 'rgba(255,255,255,0.07)',
                boxShadow: i < accessLevel ? '0 0 4px rgba(157,78,221,0.5)' : 'none',
              }}
            />
          ))}
        </div>

        <span
          className="w-[5px] h-[5px] rounded-full shrink-0"
          style={{ background: '#9D4EDD', boxShadow: '0 0 8px rgba(157,78,221,0.8)' }}
        />
        <span className="text-[11px] text-neon-purple/65 tracking-[0.08em] tabular-nums">
          {accessLevel}
        </span>
      </div>
    </motion.nav>
  );
}
