"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ResetProgressDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          aria-describedby="reset-dialog-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop — error-red radial tint reinforces the destructive nature */}
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,77,109,0.07) 0%, rgba(0,0,0,0.84) 65%)",
            }}
            onClick={onClose}
          />

          {/* Dialog card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative z-10 w-full max-w-sm glass-panel rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,77,109,0.14), 0 24px 64px rgba(0,0,0,0.65), 0 0 48px rgba(255,77,109,0.07)",
            }}
          >
            {/* Error-red top accent — signals destructive action */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,77,109,0.85), transparent)",
              }}
            />

            {/* Corner brackets */}
            {(
              [
                "top-3 left-3 border-t-2 border-l-2",
                "top-3 right-3 border-t-2 border-r-2",
                "bottom-3 left-3 border-b-2 border-l-2",
                "bottom-3 right-3 border-b-2 border-r-2",
              ] as const
            ).map((cls, k) => (
              <span
                key={k}
                className={`absolute w-3.5 h-3.5 pointer-events-none ${cls}`}
                style={{ borderColor: "rgba(255,77,109,0.28)" }}
              />
            ))}

            {/* Status bar header */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.05]">
              <span className="text-[9px] font-mono text-error-red/60 tracking-[0.25em] uppercase glow-text-red">
                ⚠ DESTRUCTIVE OPERATION
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1 rounded text-zinc-600 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6 sm:p-7 flex flex-col items-center text-center">
              {/* Warning icon with pulse ring */}
              <div className="relative mb-5">
                <div
                  className="absolute inset-0 pulse-ring rounded-xl"
                  style={{ background: "rgba(255,77,109,0.12)" }}
                />
                <div className="relative p-3.5 rounded-xl border bg-error-red/8 border-error-red/25">
                  <AlertTriangle
                    size={26}
                    className="text-error-red"
                    strokeWidth={1.5}
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(255,77,109,0.5))",
                    }}
                  />
                </div>
              </div>

              <h2
                id="reset-dialog-title"
                className="text-base sm:text-lg font-bold text-white tracking-tight mb-2"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                RESET PUZZLE STATE
              </h2>
              <p
                id="reset-dialog-desc"
                className="text-[11px] font-mono text-zinc-500 leading-relaxed tracking-wide max-w-xs"
              >
                Encrypted modules will lock again. Access level returns to{" "}
                <span className="text-neon-purple/80">00</span>. This only
                clears saved progress in this browser.
              </p>

              <div className="w-full mt-6 border-t border-white/[0.05]" />

              <div className="flex flex-col-reverse sm:flex-row gap-2.5 w-full mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-[0.2em] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-[0.2em] border border-error-red/40 bg-error-red/10 text-error-red hover:bg-error-red/20 hover:border-error-red/60 transition-all duration-200"
                  style={{ boxShadow: "0 0 20px rgba(255,77,109,0.1)" }}
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
