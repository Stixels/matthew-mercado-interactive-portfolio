'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

const ACCENT = '#FFB800';
const ACCENT_DIM = 'rgba(255, 184, 0, 0.35)';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ResetPuzzleProgressModal({ open, onClose, onConfirm }: Props) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-puzzle-dialog-title"
          aria-describedby="reset-puzzle-dialog-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/[0.08]"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
              style={{
                background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
                opacity: 0.85,
              }}
            />

            {(['top-3 left-3 border-t-2 border-l-2',
              'top-3 right-3 border-t-2 border-r-2',
              'bottom-3 left-3 border-b-2 border-l-2',
              'bottom-3 right-3 border-b-2 border-r-2'] as const).map((cls, k) => (
              <span key={k} className={`absolute w-3.5 h-3.5 pointer-events-none ${cls}`} style={{ borderColor: ACCENT_DIM }} />
            ))}

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col items-center text-center pt-1">
              <div
                className="mb-4 p-3 rounded-xl border bg-neon-amber/8 border-neon-amber/25"
                style={{ boxShadow: '0 0 24px rgba(255, 184, 0, 0.12)' }}
              >
                <AlertTriangle size={28} className="text-neon-amber" strokeWidth={1.5} />
              </div>

              <h2
                id="reset-puzzle-dialog-title"
                className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                RESET PUZZLE STATE
              </h2>
              <p
                id="reset-puzzle-dialog-desc"
                className="text-xs sm:text-sm font-mono text-zinc-500 leading-relaxed tracking-wide max-w-sm mb-8"
              >
                Encrypted modules will lock again. Access level returns to{' '}
                <span className="text-neon-purple/90">00</span>. This only clears saved progress in this browser.
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:justify-center sm:max-w-sm">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-3 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] border border-error-red/40 bg-error-red/10 text-error-red hover:bg-error-red/20 hover:border-error-red/60 transition-all"
                  style={{ boxShadow: '0 0 20px rgba(255, 77, 109, 0.08)' }}
                >
                  Confirm reset
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
