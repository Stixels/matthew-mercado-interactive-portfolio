'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useSystemStore } from '@/store/systemStore';
import ResetProgressDialog from '@/components/ui/ResetProgressDialog';
import RebootDialog from '@/components/ui/RebootDialog';
import { portfolioProjects } from '@/content/portfolio';
import { Lock, Unlock, Terminal, ChevronRight, Activity, RotateCcw, Power } from 'lucide-react';

const LEVEL_COLORS: Record<string, string> = {
  ACTIVE:       'neon-blue',
  DEPLOYED:     'neon-purple',
  DEGRADED:     'neon-amber',
  OFFLINE:      'neon-green',
  RESTRICTED:   'error-red',
  EXPERIMENTAL: 'neon-blue',
  VERIFIED:     'neon-green',
};

export default function SystemHub() {
  const router = useRouter();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [rebootDialogOpen, setRebootDialogOpen] = useState(false);
  const { accessLevel, unlockedModules, resetPuzzleProgress } = useSystemStore();

  const puzzleCount = portfolioProjects.filter((p) => p.puzzleType).length;
  const hasPuzzleProgress = unlockedModules.length > 0 || accessLevel > 0;

  const openResetModal = () => {
    if (!hasPuzzleProgress) return;
    setResetModalOpen(true);
  };

  const handleReboot = useCallback(() => {
    sessionStorage.removeItem('booted');
    router.push('/');
  }, [router]);

  const openRebootDialog = () => setRebootDialogOpen(true);

  const maxLevel = 4;

  return (
    <div className="min-h-screen bg-background circuit-grid pt-[64px] px-6 pb-6 md:px-12 md:pb-12 relative">
      <ResetProgressDialog
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetPuzzleProgress}
      />
      <RebootDialog
        open={rebootDialogOpen}
        onClose={() => setRebootDialogOpen(false)}
        onConfirm={handleReboot}
      />

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 md:mb-16">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-neon-green" />
              <span className="text-xs font-mono text-neon-green/70 tracking-[0.2em] uppercase">
                System Online
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-1"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              PROJECTS
            </h1>
            <p className="text-[10px] sm:text-xs font-mono text-neon-blue/60 tracking-widest uppercase glow-text-blue">
              PORTFOLIO HUB&nbsp;&nbsp;░&nbsp;&nbsp;SELECTED WORK
            </p>
          </div>

          {/* Access Level Gauge */}
          <div className="shrink-0 sm:text-right flex sm:flex-col items-center sm:items-end gap-4 sm:gap-0">
            <div>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Access Level</p>
              <div
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-neon-purple leading-none mb-2"
                style={{ fontFamily: 'var(--font-orbitron)', textShadow: '0 0 20px rgba(157,78,221,0.5)' }}
              >
                0{accessLevel}
              </div>
            </div>
            <div className="flex gap-1 sm:justify-end mt-0 sm:mt-1">
              {Array.from({ length: maxLevel }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-6 sm:w-8 rounded-full transition-all duration-700 ${
                    i < accessLevel
                      ? 'bg-neon-purple shadow-[0_0_8px_rgba(157,78,221,0.8)]'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Status strip */}
        <div className="flex items-center gap-4 sm:gap-6 mt-4 text-[10px] font-mono text-zinc-600 overflow-x-auto pb-1">
          <span className="flex items-center gap-1.5">
            <Activity size={10} className="text-neon-green/50" />
            <span>ENTRIES: {portfolioProjects.length}</span>
          </span>
          <span>░</span>
          <span>UNLOCKED: {unlockedModules.length} / {puzzleCount}</span>
          <span>░</span>
          <button
            type="button"
            onClick={openResetModal}
            disabled={!hasPuzzleProgress}
            className="flex items-center gap-1.5 shrink-0 text-neon-amber/50 hover:text-neon-amber disabled:opacity-25 disabled:pointer-events-none disabled:hover:text-neon-amber/50 transition-colors uppercase tracking-widest"
            title="Clear saved puzzle unlocks"
          >
            <RotateCcw size={10} />
            Reset puzzles
          </button>
          <span>░</span>
          <button
            type="button"
            onClick={openRebootDialog}
            className="flex items-center gap-1.5 shrink-0 text-neon-blue/40 hover:text-neon-blue transition-colors uppercase tracking-widest"
            title="Return to boot sequence"
          >
            <Power size={10} />
            Reboot
          </button>
          <span>░</span>
          <span className="text-neon-blue/40">ENCRYPTION: AES-256-GCM</span>
        </div>
      </header>

      {/* Project Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {portfolioProjects.map((proj, index) => {
          const isLocked = proj.puzzleType !== null && !unlockedModules.includes(proj.id);
          const Icon = proj.icon;
          const accentColor = isLocked ? 'error-red' : LEVEL_COLORS[proj.tag] || 'neon-blue';

          return (
            <motion.button
              key={proj.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => isLocked ? router.push('/puzzles/' + proj.id) : router.push('/projects/' + proj.id)}
              className={`
                relative p-6 md:p-8 text-left rounded-2xl transition-colors duration-300
                glass-panel group overflow-hidden
                ${isLocked
                  ? 'hover:border-error-red/15'
                  : 'glass-panel-active hover:border-neon-blue/20'
                }
              `}
            >
              {/* Warning stripes for locked */}
              {isLocked && (
                <div className="absolute inset-0 warning-stripes rounded-2xl opacity-60 pointer-events-none" />
              )}

              {/* Corner brackets — top-left only for cleaner look */}
              <span className={`absolute top-3 left-3 w-3 h-3 border-t border-l transition-colors duration-300 ${isLocked ? 'border-error-red/25' : 'border-neon-blue/30 group-hover:border-neon-blue/60'}`} />
              <span className={`absolute bottom-3 right-3 w-3 h-3 border-b border-r transition-colors duration-300 ${isLocked ? 'border-error-red/25' : 'border-neon-blue/30 group-hover:border-neon-blue/60'}`} />

              {/* Hover glow overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none ${isLocked ? 'bg-error-red/[0.02]' : 'bg-neon-blue/[0.02]'}`} />

              {/* Project ID ghost number */}
              <div
                className="absolute right-6 top-4 text-7xl font-bold text-white/[0.03] select-none pointer-events-none leading-none"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                {/* Top row */}
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-3 rounded-xl border transition-all duration-500 ${
                    isLocked
                      ? 'bg-white/3 border-white/5 text-zinc-600'
                      : `bg-${accentColor}/8 border-${accentColor}/20 text-${accentColor}`
                  }`}>
                    <Icon size={28} />
                  </div>

                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono border tracking-widest ${
                    isLocked
                      ? 'text-error-red bg-error-red/8 border-error-red/20'
                      : 'text-neon-green bg-neon-green/8 border-neon-green/20'
                  }`}>
                    {isLocked ? <Lock size={9} /> : <Unlock size={9} />}
                    <span>{isLocked ? 'ENCRYPTED' : 'ACCESSIBLE'}</span>
                  </div>
                </div>

                {/* Title and subtitle */}
                <div className="mb-4">
                  <p className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase mb-1">
                    {proj.hubSubtitle}
                  </p>
                  <h3 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                    isLocked ? 'text-zinc-500' : 'text-white'
                  }`}>
                    {proj.hubTitle ?? proj.title}
                  </h3>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${
                      isLocked ? 'text-error-red/50' : `text-${accentColor}/60`
                    }`}>
                      SEC-LVL-{String(proj.level).padStart(2, '0')}
                    </span>
                    <span className="text-white/10">•</span>
                    <span className={`text-[10px] font-mono ${
                      isLocked ? 'text-error-red/50' : `text-${accentColor}/60`
                    }`}>
                      {proj.tag}
                    </span>
                  </div>

                  {isLocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-error-red/60">
                      <Terminal size={10} />
                      DECRYPT
                    </span>
                  ) : (
                    <ChevronRight size={14} className="text-neon-blue/40 group-hover:text-neon-blue/80 group-hover:translate-x-0.5 transition-all duration-300" />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </main>
    </div>
  );
}
