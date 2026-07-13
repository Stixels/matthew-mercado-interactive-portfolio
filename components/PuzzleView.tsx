"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { getPuzzleByProjectId } from "@/content/portfolio";
import { useSystemStore } from "@/store/systemStore";
import { CheckCircle, RotateCcw } from "lucide-react";

const AmbientParticles = dynamic(() => import("./AmbientParticles"), {
  ssr: false,
  loading: () => null,
});

// ─── Cipher Dials ──────────────────────────────────────────────────────────────

const CIPHER_SYMBOLS = [
  "◈",
  "⬡",
  "△",
  "◊",
  "○",
  "★",
  "⬟",
  "⊕",
  "⎈",
  "✦",
  "⚛",
  "▲",
];

function CipherDials({ onSuccess }: { onSuccess: () => void }) {
  const N = CIPHER_SYMBOLS.length;
  const target = [11, 3, 10, 9];
  const [values, setValues] = useState([0, 0, 0, 0]);
  const [dirs, setDirs] = useState([1, 1, 1, 1]);
  const [solved, setSolved] = useState(false);

  const adjust = (idx: number, dir: 1 | -1) => {
    if (solved) return;
    setDirs((d) => d.map((v, i) => (i === idx ? dir : v)));
    setValues((prev) => {
      const next = prev.map((v, i) => (i === idx ? (v + dir + N) % N : v));
      if (next.every((v, i) => v === target[i])) {
        setSolved(true);
        setTimeout(onSuccess, 1100);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Target code */}
      <div>
        <p className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase text-center mb-3">
          Target Code
        </p>
        <div className="flex gap-3">
          {target.map((t, i) => (
            <div
              key={i}
              className="w-14 h-14 flex items-center justify-center text-2xl rounded-lg border transition-all duration-300"
              style={{
                borderColor:
                  values[i] === target[i]
                    ? "rgba(114,239,221,0.6)"
                    : "rgba(76,201,240,0.2)",
                background:
                  values[i] === target[i]
                    ? "rgba(114,239,221,0.08)"
                    : "rgba(76,201,240,0.04)",
                color:
                  values[i] === target[i] ? "#72EFDD" : "rgba(76,201,240,0.5)",
                boxShadow:
                  values[i] === target[i]
                    ? "0 0 14px rgba(114,239,221,0.25)"
                    : "none",
              }}
            >
              {CIPHER_SYMBOLS[t]}
            </div>
          ))}
        </div>
      </div>

      {/* Dials */}
      <div className="flex gap-2 sm:gap-4">
        {values.map((v, i) => {
          const matched = v === target[i];
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <button
                onClick={() => adjust(i, 1)}
                disabled={solved}
                className="w-10 sm:w-12 h-8 sm:h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-500 hover:bg-white/8 hover:text-white transition-all disabled:opacity-30 text-sm"
              >
                ▲
              </button>

              <div
                className="w-14 h-[72px] relative overflow-hidden rounded-xl flex items-center justify-center"
                style={{
                  border: `2px solid ${matched ? "rgba(114,239,221,0.6)" : "rgba(76,201,240,0.25)"}`,
                  background: matched
                    ? "rgba(114,239,221,0.06)"
                    : "rgba(76,201,240,0.04)",
                  boxShadow: matched
                    ? "0 0 18px rgba(114,239,221,0.25)"
                    : "none",
                  transition: "all 0.3s",
                }}
              >
                {/* top fade */}
                <div
                  className="absolute inset-x-0 top-0 h-5 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, #030305, transparent)",
                  }}
                />
                {/* bottom fade */}
                <div
                  className="absolute inset-x-0 bottom-0 h-5 pointer-events-none z-10"
                  style={{
                    background: "linear-gradient(to top, #030305, transparent)",
                  }}
                />

                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={v}
                    initial={{ y: dirs[i] > 0 ? -28 : 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: dirs[i] > 0 ? 28 : -28, opacity: 0 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="text-[2rem] select-none"
                    style={{ color: matched ? "#72EFDD" : "#ffffff" }}
                  >
                    {CIPHER_SYMBOLS[v]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <button
                onClick={() => adjust(i, -1)}
                disabled={solved}
                className="w-10 sm:w-12 h-8 sm:h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-500 hover:bg-white/8 hover:text-white transition-all disabled:opacity-30 text-sm"
              >
                ▼
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] font-mono text-zinc-600 tracking-[0.12em]">
        SCROLL EACH DIAL TO MATCH THE TARGET CODE
      </p>
    </div>
  );
}

// ─── Pipe Router ────────────────────────────────────────────────────────────────

type Side = "N" | "E" | "S" | "W";
type TileType = "corner" | "straight";

interface PipeTile {
  type: TileType;
  rotation: number; // 0-3 → ×90° CW
  locked?: boolean;
}

const SIDES: Side[] = ["N", "E", "S", "W"];
const DELTA: Record<Side, [number, number]> = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};
const OPP: Record<Side, Side> = { N: "S", S: "N", E: "W", W: "E" };
const BASE: Record<TileType, Side[]> = {
  corner: ["N", "E"],
  straight: ["N", "S"],
};
const COLS = 5,
  ROWS = 3;

function getConns(t: PipeTile): Side[] {
  return BASE[t.type].map((s) => SIDES[(SIDES.indexOf(s) + t.rotation) % 4]);
}

function floodFill(grid: PipeTile[][]): Set<string> {
  const vis = new Set<string>();
  if (!getConns(grid[0][0]).includes("W")) return vis;
  const q: [number, number][] = [[0, 0]];
  vis.add("0,0");
  while (q.length) {
    const [c, r] = q.shift()!;
    for (const side of getConns(grid[r][c])) {
      const [dc, dr] = DELTA[side];
      const nc = c + dc,
        nr = r + dr;
      if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue;
      const k = `${nc},${nr}`;
      if (vis.has(k)) continue;
      if (getConns(grid[nr][nc]).includes(OPP[side])) {
        vis.add(k);
        q.push([nc, nr]);
      }
    }
  }
  return vis;
}

function isPipeSolved(grid: PipeTile[][]): boolean {
  const lit = floodFill(grid);
  return lit.has("4,0") && getConns(grid[0][4]).includes("E");
}

// Solution path: (0,0)→S→(0,1)→E→(1,1)→S→(1,2)→E→(2,2)→E→(3,2)→N→(3,1)→E→(4,1)→N→(4,0)→E exit
// corner rot=2:{S,W}  corner rot=0:{N,E}  corner rot=2:{S,W}  corner rot=0:{N,E}
// straight rot=1:{E,W}  corner rot=3:{W,N}  corner rot=1:{E,S}  corner rot=3:{W,N}  corner rot=1:{E,S}
function makePipeGrid(): PipeTile[][] {
  let seed = 17;
  const nextRotation = () => {
    seed = (seed * 13 + 7) % 97;
    return seed % 4;
  };
  const wr = (sol: number) => {
    const opts = [0, 1, 2, 3].filter((x) => x !== sol);
    return opts[nextRotation() % opts.length];
  };
  const rnd = () => nextRotation();
  return [
    // Row 0
    [
      { type: "corner", rotation: 2, locked: true }, // (0,0) {S,W} entry
      { type: "straight", rotation: rnd(), locked: false }, // (1,0) filler
      { type: "corner", rotation: rnd(), locked: false }, // (2,0) filler
      { type: "straight", rotation: rnd(), locked: false }, // (3,0) filler
      { type: "corner", rotation: 1, locked: true }, // (4,0) {E,S} exit
    ],
    // Row 1
    [
      { type: "corner", rotation: wr(0), locked: false }, // (0,1) sol {N,E}
      { type: "corner", rotation: wr(2), locked: false }, // (1,1) sol {S,W}
      { type: "corner", rotation: rnd(), locked: false }, // (2,1) filler
      { type: "corner", rotation: wr(1), locked: false }, // (3,1) sol {E,S}
      { type: "corner", rotation: wr(3), locked: false }, // (4,1) sol {W,N}
    ],
    // Row 2
    [
      { type: "straight", rotation: rnd(), locked: false }, // (0,2) filler
      { type: "corner", rotation: wr(0), locked: false }, // (1,2) sol {N,E}
      { type: "straight", rotation: wr(1), locked: false }, // (2,2) sol {E,W}
      { type: "corner", rotation: wr(3), locked: false }, // (3,2) sol {W,N}
      { type: "corner", rotation: rnd(), locked: false }, // (4,2) filler
    ],
  ];
}

function PipeTileCell({
  tile,
  col,
  row,
  litTiles,
  solved,
  rotAngle,
  onClick,
}: {
  tile: PipeTile;
  col: number;
  row: number;
  litTiles: Set<string>;
  solved: boolean;
  rotAngle: number;
  onClick: () => void;
}) {
  const isEntry = col === 0 && row === 0;
  const isExit = col === 4 && row === 0;
  const lit = litTiles.has(`${col},${row}`);
  const pipeColor = lit ? "#72EFDD" : "rgba(76,201,240,0.15)";

  return (
    <div
      onClick={!tile.locked ? onClick : undefined}
      className="relative flex items-center justify-center border border-white/[0.04] transition-colors duration-200"
      style={{
        width: 58,
        height: 58,
        background: lit ? "rgba(114,239,221,0.04)" : "rgba(255,255,255,0.01)",
        cursor: tile.locked ? "default" : "pointer",
      }}
    >
      {!tile.locked && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
          style={{ background: "rgba(255,255,255,0.02)" }}
        />
      )}

      <svg
        viewBox="0 0 58 58"
        style={{
          width: 46,
          height: 46,
          transform: `rotate(${rotAngle}deg)`,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          filter: lit ? "drop-shadow(0 0 4px rgba(114,239,221,0.5))" : "none",
        }}
      >
        {tile.type === "corner" ? (
          <>
            <line
              x1="29"
              y1="0"
              x2="29"
              y2="29"
              stroke={pipeColor}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <line
              x1="29"
              y1="29"
              x2="58"
              y2="29"
              stroke={pipeColor}
              strokeWidth="9"
              strokeLinecap="round"
            />
          </>
        ) : (
          <line
            x1="29"
            y1="0"
            x2="29"
            y2="58"
            stroke={pipeColor}
            strokeWidth="9"
            strokeLinecap="round"
          />
        )}
        <circle cx="29" cy="29" r="7" fill={pipeColor} />
      </svg>

      {/* Entry / exit badge */}
      {isEntry && (
        <span
          className="absolute top-1 left-1 text-[7px] font-mono leading-none"
          style={{ color: "#72EFDD", opacity: 0.7 }}
        >
          IN
        </span>
      )}
      {isExit && (
        <span
          className="absolute top-1 right-1 text-[7px] font-mono leading-none"
          style={{
            color: solved ? "#72EFDD" : "rgba(157,78,221,0.7)",
            transition: "color 0.5s",
          }}
        >
          OUT
        </span>
      )}
    </div>
  );
}

function PipeRouter({ onSuccess }: { onSuccess: () => void }) {
  // Initialise grid and angles from the same random seed
  const [initState] = useState(() => {
    const g = makePipeGrid();
    return { grid: g, angles: g.map((row) => row.map((t) => t.rotation * 90)) };
  });
  const [grid, setGrid] = useState<PipeTile[][]>(initState.grid);
  const [rotAngles, setAngles] = useState<number[][]>(initState.angles);
  const [litTiles, setLitTiles] = useState<Set<string>>(() =>
    floodFill(initState.grid),
  );
  const [solved, setSolved] = useState(false);

  const rotateCell = (col: number, row: number) => {
    if (solved || grid[row][col].locked) return;
    setGrid((prev) => {
      const next = prev.map((r) => r.map((t) => ({ ...t })));
      next[row][col].rotation = (next[row][col].rotation + 1) % 4;
      const newLit = floodFill(next);
      setLitTiles(newLit);
      if (isPipeSolved(next)) {
        setSolved(true);
        setTimeout(onSuccess, 1200);
      }
      return next;
    });
    // Always accumulate — never reset — so rotation animates forward continuously
    setAngles((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] += 90;
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Column labels — aligned to grid columns */}
      <div
        className="overflow-x-hidden"
        style={{ display: "grid", gridTemplateColumns: `repeat(${COLS},58px)` }}
      >
        <div className="flex justify-center">
          <span
            className="text-[8px] font-mono tracking-widest"
            style={{ color: "#72EFDD" }}
          >
            ▶ IN
          </span>
        </div>
        {Array.from({ length: COLS - 2 }).map((_, i) => (
          <div key={i} />
        ))}
        <div className="flex justify-center">
          <span
            className="text-[8px] font-mono tracking-widest transition-colors duration-500"
            style={{ color: solved ? "#72EFDD" : "rgba(157,78,221,0.7)" }}
          >
            OUT ▶
          </span>
        </div>
      </div>

      {/* Grid — scrollable horizontally on very small screens */}
      <div className="overflow-x-auto w-full flex justify-center pb-1">
        <div
          className="rounded-xl overflow-hidden shrink-0"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            display: "grid",
            gridTemplateColumns: `repeat(${COLS},58px)`,
            gridTemplateRows: `repeat(${ROWS},58px)`,
          }}
        >
          {grid.map((row, ri) =>
            row.map((tile, ci) => (
              <PipeTileCell
                key={`${ci}-${ri}`}
                tile={tile}
                col={ci}
                row={ri}
                litTiles={litTiles}
                solved={solved}
                rotAngle={rotAngles[ri]?.[ci] ?? tile.rotation * 90}
                onClick={() => rotateCell(ci, ri)}
              />
            )),
          )}
        </div>
      </div>

      <p className="text-[10px] font-mono text-zinc-600 tracking-[0.12em]">
        CLICK TILES TO ROTATE · ROUTE IN TO OUT
      </p>
    </div>
  );
}

// ─── Frequency Faders ───────────────────────────────────────────────────────────

function freqDisplay(v: number) {
  return ((v / 100) * 7 + 1).toFixed(1) + " Hz";
}
function ampDisplay(v: number) {
  return Math.round(v) + "%";
}
function phaseDisplay(v: number) {
  return Math.round(v * 3.6) + "°";
}

const FADER_META = [
  { label: "FREQ", sublabel: "cycles / sec", display: freqDisplay },
  { label: "AMP", sublabel: "signal height", display: ampDisplay },
  { label: "PHASE", sublabel: "wave offset", display: phaseDisplay },
];

const TRACK_H = 130; // px

interface FaderProps {
  value: number;
  target: number;
  label: string;
  sublabel: string;
  displayFn: (v: number) => string;
  locked: boolean;
  solved: boolean;
  onChange: (v: number) => void;
}

function Fader({
  value,
  target,
  label,
  sublabel,
  displayFn,
  locked,
  solved,
  onChange,
}: FaderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const valueFromClientY = useCallback(
    (clientY: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return value;
      const pct = 1 - (clientY - rect.top) / rect.height;
      return Math.max(0, Math.min(100, Math.round(pct * 100)));
    },
    [value],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (solved) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    onChange(valueFromClientY(e.clientY));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!(e.buttons & 1) || solved) return;
    onChange(valueFromClientY(e.clientY));
  };

  const color = locked ? "#72EFDD" : "#4CC9F0";
  const handlePct = value; // 0 = bottom, 100 = top
  const targetPct = target;
  const handleTopPx = (1 - handlePct / 100) * TRACK_H;
  const targetTopPx = (1 - targetPct / 100) * TRACK_H;

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Label */}
      <p
        className="text-[10px] font-mono font-semibold tracking-[0.2em]"
        style={{ color }}
      >
        {label}
      </p>
      <p className="text-[8px] font-mono text-zinc-600 tracking-widest">
        {sublabel}
      </p>

      {/* Fader track area */}
      <div
        ref={trackRef}
        className="relative touch-none"
        style={{
          width: 32,
          height: TRACK_H,
          cursor: solved ? "default" : "ns-resize",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => {}}
      >
        {/* Track groove */}
        <div
          className="absolute rounded-full"
          style={{
            left: 14,
            top: 0,
            bottom: 0,
            width: 4,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        {/* Fill below handle */}
        <div
          className="absolute rounded-full transition-all duration-75"
          style={{
            left: 14,
            width: 4,
            bottom: 0,
            height: `${handlePct}%`,
            background: color,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
        {/* Target notch — the goal line */}
        <div
          className="absolute transition-colors duration-300"
          style={{
            left: 0,
            right: 0,
            top: targetTopPx - 1,
            height: 3,
            background: locked ? "#72EFDD" : "rgba(255,255,255,0.3)",
            borderRadius: 2,
            boxShadow: locked ? "0 0 6px #72EFDD" : "none",
          }}
        />
        {/* Handle pill */}
        <div
          className="absolute rounded transition-colors duration-300"
          style={{
            left: 4,
            right: 4,
            top: handleTopPx - 8,
            height: 16,
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>

      {/* Current value */}
      <p
        className="text-[11px] font-mono font-bold tabular-nums"
        style={{ color }}
      >
        {displayFn(value)}
      </p>
      {/* Target value */}
      <p className="text-[9px] font-mono text-zinc-500 tabular-nums">
        ▸ {displayFn(target)}
      </p>
      {/* Lock indicator */}
      <p
        className={`text-[9px] font-mono tracking-widest transition-colors duration-300 ${locked ? "text-neon-green" : "text-zinc-700"}`}
      >
        {locked ? "✓ LOCKED" : "· · · · ·"}
      </p>
    </div>
  );
}

function FrequencyFaders({ onSuccess }: { onSuccess: () => void }) {
  const targets = useMemo(() => [42, 67, 28], []);
  const [values, setValues] = useState([5, 5, 5]);
  const [solved, setSolved] = useState(false);
  const TOLERANCE = 6;

  const checkSolved = useCallback(
    (vals: number[]) => {
      if (vals.every((v, i) => Math.abs(v - targets[i]) <= TOLERANCE)) {
        setSolved(true);
        setTimeout(onSuccess, 1100);
      }
    },
    [targets, onSuccess],
  );

  const handleChange = useCallback(
    (idx: number, v: number) => {
      setValues((prev) => {
        const next = [...prev];
        next[idx] = v;
        checkSolved(next);
        return next;
      });
    },
    [checkSolved],
  );

  // freq: 0-100 → 1-8 Hz, amp: 0-100 → 0-16px, phase: 0-100 → 0-2π
  const buildPath = useCallback((vals: number[]) => {
    const freqHz = (vals[0] / 100) * 7 + 1;
    const ampPx = (vals[1] / 100) * 16;
    const phaseRad = (vals[2] / 100) * 2 * Math.PI;
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const x = (i / 120) * 240;
      const y = 20 - ampPx * Math.sin(freqHz * x * 0.0262 + phaseRad);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  }, []);

  const wavePath = useMemo(() => buildPath(values), [buildPath, values]);
  const tgtPath = useMemo(() => buildPath(targets), [buildPath, targets]);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Oscilloscope */}
      <div className="w-full rounded-xl border border-white/[0.06] bg-black/30 p-3">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[9px] font-mono text-zinc-700 tracking-[0.2em]">
            SIGNAL MONITOR
          </p>
          <p className="text-[9px] font-mono text-zinc-600">
            <span className="text-zinc-500">— —</span> TARGET &nbsp;
            <span style={{ color: "#4CC9F0" }}>———</span> YOURS
          </p>
        </div>
        <svg width="100%" viewBox="0 0 240 40" style={{ overflow: "visible" }}>
          <line
            x1="0"
            y1="20"
            x2="240"
            y2="20"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
          <path
            d={tgtPath}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <motion.path
            d={wavePath}
            initial={{ d: wavePath }}
            fill="none"
            stroke={solved ? "#72EFDD" : "#4CC9F0"}
            strokeWidth="2"
            animate={{ d: wavePath }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            style={{
              filter: `drop-shadow(0 0 4px ${solved ? "#72EFDD" : "#4CC9F0"})`,
            }}
          />
        </svg>
      </div>

      {/* Faders */}
      <div className="flex gap-8 sm:gap-12 items-start">
        {values.map((v, i) => (
          <Fader
            key={i}
            value={v}
            target={targets[i]}
            label={FADER_META[i].label}
            sublabel={FADER_META[i].sublabel}
            displayFn={FADER_META[i].display}
            locked={solved || Math.abs(v - targets[i]) <= TOLERANCE}
            solved={solved}
            onChange={(val) => handleChange(i, val)}
          />
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-600 tracking-[0.12em]">
        DRAG FADERS · ALIGN TO WHITE TARGET LINES
      </p>
    </div>
  );
}

// ─── Hex Memory ─────────────────────────────────────────────────────────────────

// Pointy-top hexagons, R=30.  Center-to-center = √3·R ≈ 51.96.
// Vertical step = 1.5·R = 45.  ViewBox "0 0 200 185", flower centre (100, 92).
const HEX_CENTERS: [number, number][] = [
  [100, 92], // 0 centre
  [125.98, 47], // 1 NE
  [151.96, 92], // 2 E
  [125.98, 137], // 3 SE
  [74.02, 137], // 4 SW
  [48.04, 92], // 5 W
  [74.02, 47], // 6 NW
];

const HEX_SYMBOLS = ["⬟", "◈", "⬡", "△", "◊", "★", "▲"];

// Pointy-top polygon vertices for hex centred at (cx, cy), R=30
function hexPts(cx: number, cy: number): string {
  return [
    [cx, cy - 30],
    [cx + 25.98, cy - 15],
    [cx + 25.98, cy + 15],
    [cx, cy + 30],
    [cx - 25.98, cy + 15],
    [cx - 25.98, cy - 15],
  ]
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

function HexMemory({ onSuccess }: { onSuccess: () => void }) {
  const sequence = useMemo(() => [0, 3, 5, 1, 6], []);

  const [showingIdx, setShowingIdx] = useState<number>(-1); // hex idx currently lit
  const [showing, setShowing] = useState(true);
  const [userSeq, setUserSeq] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);
  const [solved, setSolved] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const playSequence = useCallback(() => {
    clearTimers();
    setShowing(true);
    setShowingIdx(-1);
    setUserSeq([]);
    setIsError(false);

    sequence.forEach((hexIdx, step) => {
      const t1 = setTimeout(
        () => {
          setShowingIdx(hexIdx);
          const t2 = setTimeout(() => {
            setShowingIdx(-1);
            if (step === sequence.length - 1) setShowing(false);
          }, 480);
          timersRef.current.push(t2);
        },
        step * 750 + 300,
      );
      timersRef.current.push(t1);
    });
  }, [sequence]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) playSequence();
    });
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [playSequence]);

  const handleHexClick = (idx: number) => {
    if (showing || solved || isError) return;

    const next = [...userSeq, idx];

    if (next[next.length - 1] !== sequence[next.length - 1]) {
      setIsError(true);
      setUserSeq(next);
      const t = setTimeout(() => {
        setIsError(false);
        setUserSeq([]);
        setTimeout(playSequence, 400);
      }, 800);
      timersRef.current.push(t);
      return;
    }

    setUserSeq(next);
    if (next.length === sequence.length) {
      setSolved(true);
      setTimeout(onSuccess, 1100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase text-center">
        {showing
          ? "Memorise the sequence…"
          : solved
            ? "Neural Link Established"
            : "Repeat the sequence"}
      </p>

      <svg
        viewBox="0 0 200 185"
        width={180}
        height={167}
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="hglow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {HEX_CENTERS.map(([cx, cy], i) => {
          const isShowing = showingIdx === i;
          const isSelected = userSeq.includes(i);
          const errHighlight = isError && isSelected;
          const okHighlight = solved && isSelected;
          const activePlayer = !showing && isSelected && !isError;

          let fill = "rgba(76,201,240,0.05)";
          let stroke = "rgba(76,201,240,0.15)";
          let sw = 1;
          let filter = "";
          let txtFill = "rgba(76,201,240,0.4)";

          if (isShowing) {
            fill = "rgba(76,201,240,0.35)";
            stroke = "rgba(76,201,240,0.9)";
            sw = 2;
            filter = "url(#hglow)";
            txtFill = "#ffffff";
          } else if (errHighlight) {
            fill = "rgba(255,77,109,0.35)";
            stroke = "rgba(255,77,109,0.9)";
            sw = 2;
            filter = "url(#hglow)";
            txtFill = "#ffffff";
          } else if (okHighlight) {
            fill = "rgba(114,239,221,0.35)";
            stroke = "rgba(114,239,221,0.9)";
            sw = 2;
            filter = "url(#hglow)";
            txtFill = "#ffffff";
          } else if (activePlayer) {
            fill = "rgba(76,201,240,0.2)";
            stroke = "rgba(76,201,240,0.7)";
            sw = 2;
            txtFill = "#4CC9F0";
          }

          return (
            <g
              key={i}
              onClick={() => handleHexClick(i)}
              style={{ cursor: showing || solved ? "default" : "pointer" }}
            >
              <polygon
                points={hexPts(cx, cy)}
                fill={fill}
                stroke={stroke}
                strokeWidth={sw}
                filter={filter}
                style={{ transition: "fill 0.2s, stroke 0.2s" }}
              />
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fill: txtFill,
                  fontSize: 18,
                  transition: "fill 0.2s",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {HEX_SYMBOLS[i]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Progress dots + replay */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          {sequence.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  i < userSeq.length
                    ? isError
                      ? "#FF4D6D"
                      : "#4CC9F0"
                    : i === userSeq.length && !showing
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>

        {!showing && !solved && (
          <button
            onClick={playSequence}
            className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 hover:text-neon-blue transition-colors uppercase tracking-widest"
          >
            <RotateCcw size={10} />
            Replay
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main PuzzleView ────────────────────────────────────────────────────────────

export default function PuzzleView({ projectId }: { projectId: string }) {
  const unlockModule = useSystemStore((state) => state.unlockModule);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activePuzzle = getPuzzleByProjectId(projectId);

  const handleSuccess = useCallback(() => {
    unlockModule(projectId);
    setIsSuccess(true);
    redirectTimerRef.current = setTimeout(() => {
      router.push("/hub");
    }, 2000);
  }, [projectId, unlockModule, router]);

  useEffect(
    () => () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    },
    [],
  );

  if (!activePuzzle) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-white font-mono">No decryption sequence required.</p>
        <button
          onClick={() => router.push("/hub")}
          className="text-neon-blue font-mono text-sm hover:underline"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  const meta = activePuzzle;

  return (
    <div className="min-h-screen bg-background circuit-grid flex flex-col items-center justify-center relative overflow-hidden pt-[64px] px-6 pb-6 md:px-12 md:pb-12">
      {/* Ambient colour wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${meta.hex}08 0%, transparent 70%)`,
        }}
      />

      <AmbientParticles colorHex={meta.hex} instanceKey={activePuzzle.id} />

      {/* Success overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
              >
                <CheckCircle
                  size={64}
                  className="mx-auto mb-4"
                  style={{
                    color: "#72EFDD",
                    filter: "drop-shadow(0 0 20px rgba(114,239,221,0.8))",
                  }}
                />
              </motion.div>
              <div
                className="text-2xl font-bold tracking-widest"
                style={{
                  color: "#72EFDD",
                  fontFamily: "var(--font-orbitron)",
                  textShadow: "0 0 20px rgba(114,239,221,0.6)",
                }}
              >
                SIGNAL CLEARED
              </div>
              <div className="text-zinc-500 font-mono text-xs mt-2 tracking-widest">
                Returning to breach console…
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Puzzle card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-xl p-5 sm:p-8 md:p-10 w-full text-center relative overflow-hidden z-10"
        style={{ maxWidth: activePuzzle.id === "network" ? 520 : 440 }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${meta.hex}80, transparent)`,
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
            className={`absolute w-4 h-4 ${cls}`}
            style={{ borderColor: `${meta.hex}45` }}
          />
        ))}

        {/* Header */}
        <div className="mb-7">
          <div className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase mb-2">
            Decryption Sequence
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {meta.label}
          </h2>
          <p
            className="text-xs font-mono mt-1"
            style={{ color: `${meta.hex}80` }}
          >
            {isSuccess ? "ACCESS GRANTED" : meta.description}
          </p>
        </div>

        {/* Puzzle content */}
        <div className={isSuccess ? "opacity-20 pointer-events-none" : ""}>
          {activePuzzle.id === "auth" && (
            <CipherDials onSuccess={handleSuccess} />
          )}
          {activePuzzle.id === "network" && (
            <PipeRouter onSuccess={handleSuccess} />
          )}
          {activePuzzle.id === "frequency" && (
            <FrequencyFaders onSuccess={handleSuccess} />
          )}
          {activePuzzle.id === "matrix" && (
            <HexMemory onSuccess={handleSuccess} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
