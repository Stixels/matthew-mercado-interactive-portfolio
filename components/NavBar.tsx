'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { getProjectById, getPuzzleByProjectId } from '@/content/portfolio';
import { useSystemStore } from '@/store/systemStore';

export default function NavBar() {
  const pathname = usePathname();
  const { accessLevel } = useSystemStore();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const section  = segments[0];
  const id       = segments[1] ?? '';

  const isHub     = section === 'hub';
  const isProject = section === 'projects';
  const isPuzzle  = section === 'puzzles';
  const isDetail  = isProject || isPuzzle;

  // Resolve center label for breadcrumb
  let centerLabel = '';
  if (isProject) {
    centerLabel = getProjectById(id)?.title ?? '';
  } else if (isPuzzle) {
    centerLabel = getPuzzleByProjectId(id) ? 'DECRYPT' : '';
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-[10px] left-[10px] right-[10px] h-11 z-[60] flex items-center justify-between px-4"
      style={{
        background: 'rgba(3,3,8,0.88)',
        border: '1px solid rgba(76,201,240,0.18)',
        borderRadius: '10px',
        boxShadow: '0 0 24px rgba(76,201,240,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        fontFamily: 'var(--font-jetbrains-mono)',
      }}
    >
      {/* ── Left slot ─────────────────────────────────────────── */}
      <div className="flex items-center shrink-0">
        {/* Mobile: back icon on detail pages */}
        <Link
          href="/hub"
          className={`${isDetail ? 'flex' : 'hidden'} md:hidden items-center justify-center w-7 h-7 rounded-md border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-xs`}
          aria-label="Back to hub"
        >
          ←
        </Link>
        {/* Desktop: always MM; mobile on hub: also MM */}
        <Link
          href="/hub"
          className={`${isDetail ? 'hidden md:flex' : 'flex'} items-center text-xs font-bold tracking-[0.2em] text-neon-blue hover:text-neon-blue/70 transition-colors uppercase`}
        >
          MM
        </Link>
      </div>

      {/* ── Center slot ───────────────────────────────────────── */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase pointer-events-none">

        {/* Hub: desktop nav links / mobile label */}
        {isHub && (
          <>
            <div className="hidden md:flex items-center gap-3 pointer-events-auto">
              <Link
                href="/hub"
                className="text-neon-blue/80 hover:text-neon-blue transition-colors"
              >
                HUB
              </Link>
              <span className="text-white/15">·</span>
              <Link
                href="/projects/contact"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                CONTACT
              </Link>
            </div>
            <span className="md:hidden text-neon-blue/60">HUB</span>
          </>
        )}

        {/* Detail pages: full breadcrumb (desktop) / title only (mobile) */}
        {isDetail && (
          <>
            {/* Desktop breadcrumb */}
            <div className="hidden md:flex items-center gap-2 pointer-events-auto">
              <Link
                href="/hub"
                className="text-zinc-500 hover:text-neon-blue/70 transition-colors shrink-0"
              >
                ← HUB
              </Link>
              {centerLabel && (
                <>
                  <span className="text-white/15">/</span>
                  <span className="text-zinc-500 truncate max-w-[200px]">{centerLabel}</span>
                </>
              )}
            </div>
            {/* Mobile: title only */}
            {centerLabel && (
              <span className="md:hidden text-zinc-500 truncate max-w-[140px]">{centerLabel}</span>
            )}
          </>
        )}

        {/* Fallback: any other route */}
        {!isHub && !isDetail && (
          <Link
            href="/hub"
            className="text-zinc-500 hover:text-neon-blue/70 transition-colors pointer-events-auto"
          >
            HUB
          </Link>
        )}
      </div>

      {/* ── Right slot — access level ─────────────────────────── */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className="w-[5px] h-[5px] rounded-full bg-neon-purple shrink-0"
          style={{ boxShadow: '0 0 6px rgba(157,78,221,0.9)' }}
        />
        <span className="hidden md:inline text-[11px] text-neon-purple/70 tracking-[0.1em] uppercase">
          LVL 0{accessLevel}
        </span>
        <span className="md:hidden text-[11px] text-neon-purple/70 tracking-[0.08em]">
          {accessLevel}
        </span>
      </div>
    </motion.nav>
  );
}
