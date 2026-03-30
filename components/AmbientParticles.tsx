"use client";

/* eslint-disable react-hooks/purity -- client-only (see dynamic ssr:false in PuzzleView); random drift is intentional */
/**
 * Loaded with `dynamic(..., { ssr: false })` so this never runs on the server:
 * decorative motion uses Math.random without SSR/client mismatch.
 */
import { motion } from "motion/react";

export default function AmbientParticles({
  colorHex,
  instanceKey,
}: {
  colorHex: string;
  instanceKey: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={`${instanceKey}-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: colorHex,
            opacity: 0.3,
          }}
          animate={{ y: [0, -130], opacity: [0, 0.6, 0] }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
