'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSystemStore } from '@/store/systemStore';
import { ArrowLeft, Lock, Unlock, Network, ShieldAlert } from 'lucide-react';

const PATTERN_LENGTH = 4;
const GRID_SIZE = 9;

export default function PuzzleView() {
  const { activeProject, returnToHub, unlockModule, setAccessLevel, openProject } = useSystemStore();
  
  // Determine which puzzle to show based on the active project
  const activePuzzle = activeProject === 'data' ? 'auth' : 
                       activeProject === 'terminal' ? 'network' : 
                       activeProject === 'security' ? 'frequency' :
                       activeProject === 'ai' ? 'matrix' : null;

  // Auth Puzzle State
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Network Puzzle State (Simplified to a matching/alignment puzzle)
  const [nodes, setNodes] = useState([
    { id: 0, rotation: 90, target: 0 },
    { id: 1, rotation: 180, target: 0 },
    { id: 2, rotation: 270, target: 0 },
  ]);

  // Frequency Puzzle State
  const [frequencies, setFrequencies] = useState([0, 0, 0]);
  const [targetFrequencies, setTargetFrequencies] = useState([50, 75, 25]);

  // Matrix Puzzle State
  const [matrixTarget, setMatrixTarget] = useState<number[]>([]);
  const [matrixSelected, setMatrixSelected] = useState<number[]>([]);
  const [matrixShowing, setMatrixShowing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let timeoutId: NodeJS.Timeout;
    if (activePuzzle === 'auth') {
      timeoutId = setTimeout(() => {
        const newPattern: number[] = [];
        for (let i = 0; i < PATTERN_LENGTH; i++) {
          newPattern.push(Math.floor(Math.random() * GRID_SIZE));
        }
        setPattern(newPattern);
        setUserPattern([]);
        setIsError(false);
        setIsSuccess(false);
      }, 0);
    } else if (activePuzzle === 'network') {
      timeoutId = setTimeout(() => {
        setNodes([
          { id: 0, rotation: Math.floor(Math.random() * 3 + 1) * 90, target: 0 },
          { id: 1, rotation: Math.floor(Math.random() * 3 + 1) * 90, target: 0 },
          { id: 2, rotation: Math.floor(Math.random() * 3 + 1) * 90, target: 0 },
        ]);
        setIsSuccess(false);
      }, 0);
    } else if (activePuzzle === 'frequency') {
      timeoutId = setTimeout(() => {
        setFrequencies([10, 10, 10]);
        setTargetFrequencies([
          Math.floor(Math.random() * 60) + 20,
          Math.floor(Math.random() * 60) + 20,
          Math.floor(Math.random() * 60) + 20,
        ]);
        setIsSuccess(false);
      }, 0);
    } else if (activePuzzle === 'matrix') {
      timeoutId = setTimeout(() => {
        const targets: number[] = [];
        while (targets.length < 4) {
          const r = Math.floor(Math.random() * 9);
          if (!targets.includes(r)) targets.push(r);
        }
        setMatrixTarget(targets);
        setMatrixSelected([]);
        setIsSuccess(false);
        setMatrixShowing(true);
        setTimeout(() => setMatrixShowing(false), 2000);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [activePuzzle]);

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      if (activeProject) {
        unlockModule(activeProject);
        // If they unlocked data, give them level 1. If terminal, level 2.
        if (activeProject === 'data') setAccessLevel(1);
        if (activeProject === 'terminal') setAccessLevel(2);
        if (activeProject === 'security') setAccessLevel(3);
        if (activeProject === 'ai') setAccessLevel(4);
        openProject(activeProject);
      }
    }, 2000);
  };

  // Auth Puzzle Logic
  const playPattern = async () => {
    if (isPlaying || isSuccess) return;
    setIsPlaying(true);
    setUserPattern([]);
    setIsError(false);

    for (let i = 0; i < pattern.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setActiveNode(pattern[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setActiveNode(null);
    }
    setIsPlaying(false);
  };

  const handleNodeClick = (index: number) => {
    if (isPlaying || isSuccess) return;

    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    const isCorrectSoFar = newUserPattern.every((val, i) => val === pattern[i]);

    if (!isCorrectSoFar) {
      setIsError(true);
      setTimeout(() => {
        setUserPattern([]);
        setIsError(false);
      }, 500);
    } else if (newUserPattern.length === pattern.length) {
      handleSuccess();
    }
  };

  // Network Puzzle Logic (Simplified)
  const rotateNode = (id: number) => {
    if (isSuccess) return;
    const newNodes = nodes.map(n => {
      if (n.id === id) {
        return { ...n, rotation: (n.rotation + 90) % 360 };
      }
      return n;
    });
    setNodes(newNodes);

    if (newNodes.every(n => n.rotation === n.target)) {
      handleSuccess();
    }
  };

  // Frequency Puzzle Logic
  const handleFrequencyChange = (index: number, value: number) => {
    if (isSuccess) return;
    const newFreqs = [...frequencies];
    newFreqs[index] = value;
    setFrequencies(newFreqs);

    const isMatch = newFreqs.every((f, i) => Math.abs(f - targetFrequencies[i]) < 5);
    if (isMatch) {
      handleSuccess();
    }
  };

  // Matrix Puzzle Logic
  const handleMatrixClick = (index: number) => {
    if (isSuccess || matrixShowing) return;
    
    if (matrixSelected.includes(index)) return;

    const newSelected = [...matrixSelected, index];
    setMatrixSelected(newSelected);

    // Check if clicked a wrong one
    if (!matrixTarget.includes(index)) {
      setIsError(true);
      setTimeout(() => {
        setMatrixSelected([]);
        setIsError(false);
        setMatrixShowing(true);
        setTimeout(() => setMatrixShowing(false), 2000);
      }, 500);
      return;
    }

    if (newSelected.length === matrixTarget.length) {
      handleSuccess();
    }
  };

  // Dynamic wave path for frequency puzzle
  const wavePath = useMemo(() => {
    const points = [];
    const width = 400;
    const height = 100;
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const f1 = (frequencies[0] || 1) * 0.05;
      const f2 = (frequencies[1] || 1) * 0.05;
      const f3 = (frequencies[2] || 1) * 0.05;
      const y = height / 2 + 
                Math.sin(x * f1) * 10 + 
                Math.sin(x * f2) * 15 + 
                Math.sin(x * f3) * 10;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  }, [frequencies]);

  if (!activePuzzle) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">No decryption sequence required.</h2>
        <button onClick={returnToHub} className="text-neon-blue hover:underline">Return to Hub</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue/30 rounded-full"
              initial={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 2,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={returnToHub}
        className="absolute top-6 left-6 md:top-12 md:left-12 flex items-center text-neon-blue hover:text-white transition-colors font-mono text-sm uppercase tracking-wider z-50"
      >
        <ArrowLeft size={16} className="mr-2" />
        Abort Sequence
      </button>

      {activePuzzle === 'auth' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isError ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: isError ? 0.4 : 0.3 }}
          className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-center">
              {isSuccess ? <Unlock className="mr-3 text-neon-green" /> : <ShieldAlert className="mr-3 text-neon-blue" />}
              DECRYPT: TELEMETRY
            </h2>
            <p className="text-sm font-mono text-gray-400">
              {isSuccess ? 'ACCESS GRANTED' : 'REPLICATE ACCESS PATTERN'}
            </p>
          </div>

          <div className="relative mb-8 aspect-square w-full max-w-[240px] mx-auto">
            {/* SVG Overlay for lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible', filter: 'drop-shadow(0 0 6px currentColor)' }}>
              {userPattern.map((node, i) => {
                if (i === 0) return null;
                const prev = userPattern[i - 1];
                const getPos = (idx: number) => ({
                  x: `${(idx % 3) * 33.33 + 16.66}%`,
                  y: `${Math.floor(idx / 3) * 33.33 + 16.66}%`
                });
                const start = getPos(prev);
                const end = getPos(node);
                return (
                  <motion.line
                    key={`${prev}-${node}-${i}`}
                    x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                    stroke={isError ? "#FF4D6D" : isSuccess ? "#72EFDD" : "#4CC9F0"}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })}
            </svg>

            <div className="grid grid-cols-3 gap-0 w-full h-full relative z-20">
              {Array.from({ length: GRID_SIZE }).map((_, i) => {
                const isActive = activeNode === i;
                const isSelected = userPattern.includes(i);
                const isLastSelected = userPattern[userPattern.length - 1] === i;

                let bgColor = 'bg-white/5';
                let borderColor = 'border-white/10';
                let shadow = '';

                if (isActive) {
                  bgColor = 'bg-neon-blue/40';
                  borderColor = 'border-neon-blue';
                  shadow = 'shadow-[0_0_20px_rgba(76,201,240,0.6)]';
                } else if (isSuccess && isSelected) {
                  bgColor = 'bg-neon-green/40';
                  borderColor = 'border-neon-green';
                  shadow = 'shadow-[0_0_20px_rgba(114,239,221,0.6)]';
                } else if (isError && isLastSelected) {
                  bgColor = 'bg-error-red/40';
                  borderColor = 'border-error-red';
                  shadow = 'shadow-[0_0_20px_rgba(255,77,109,0.6)]';
                } else if (isSelected) {
                  bgColor = 'bg-neon-blue/20';
                  borderColor = 'border-neon-blue/50';
                }

                return (
                  <div key={i} className="p-2 w-full h-full flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleNodeClick(i)}
                      disabled={isPlaying || isSuccess}
                      className={`
                        w-full h-full rounded-full border-2 transition-all duration-300
                        ${bgColor} ${borderColor} ${shadow}
                      `}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activePulse"
                          className="w-full h-full rounded-full bg-neon-blue/30"
                          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={playPattern}
            disabled={isPlaying || isSuccess}
            className={`
              w-full py-3 rounded-lg font-mono text-sm uppercase tracking-wider transition-colors
              ${isPlaying || isSuccess 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 border border-neon-blue/30'}
            `}
          >
            {isPlaying ? 'OBSERVE PATTERN...' : 'INITIATE SEQUENCE'}
          </button>
        </motion.div>
      )}

      {activePuzzle === 'network' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-center">
              {isSuccess ? <Unlock className="mr-3 text-neon-green" /> : <Network className="mr-3 text-neon-purple" />}
              DECRYPT: SYSTEM LOGS
            </h2>
            <p className="text-sm font-mono text-gray-400">
              {isSuccess ? 'CONNECTION ESTABLISHED' : 'ALIGN DATA NODES TO PROCEED'}
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 mb-8 mt-4 relative">
            {/* Central Data Line */}
            <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-1 bg-white/5 z-0 rounded-full overflow-hidden">
              {isSuccess && (
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-neon-green shadow-[0_0_15px_rgba(114,239,221,1)]"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}
              {!isSuccess && (
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1/3 bg-neon-purple/30 blur-sm"
                  animate={{ top: ['-30%', '130%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>

            {nodes.map((node, i) => (
              <div key={node.id} className="relative">
                {/* Static Upwards Indicator */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                  <motion.div 
                    animate={isSuccess ? { scale: [1, 1.5, 1], backgroundColor: "#72EFDD" } : { backgroundColor: "#6b7280" }}
                    className="w-2 h-2 rounded-full mb-1 shadow-[0_0_10px_rgba(114,239,221,0)]" 
                  />
                  <div className={`w-1 h-2 rounded-sm ${isSuccess ? 'bg-neon-green' : 'bg-gray-600'}`} />
                </div>
                
                {/* Background rotating ring */}
                <motion.div 
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }} 
                  transition={{ repeat: Infinity, duration: 15 + i * 5, ease: "linear" }} 
                  className="absolute -inset-4 pointer-events-none opacity-20"
                >
                  <svg viewBox="0 0 100 100" className={`w-full h-full ${isSuccess ? 'text-neon-green' : 'text-neon-purple'}`}>
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" />
                  </svg>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => rotateNode(node.id)}
                  disabled={isSuccess}
                  className={`
                    w-24 h-24 rounded-full border-2 flex items-center justify-center transition-colors duration-300 relative z-10 overflow-hidden
                    ${isSuccess ? 'border-neon-green bg-neon-green/10 shadow-[0_0_30px_rgba(114,239,221,0.4)]' : 'border-neon-purple bg-neon-purple/5 hover:bg-neon-purple/20'}
                  `}
                >
                  <motion.div 
                    animate={{ rotate: node.rotation }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`w-full h-full relative ${isSuccess ? 'text-neon-green' : 'text-neon-purple'}`}
                  >
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="15 10" className="opacity-40" />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" className="opacity-60" />
                      {/* The main indicator line */}
                      <line x1="50" y1="50" x2="50" y2="12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="8" fill="currentColor" />
                    </svg>
                  </motion.div>
                </motion.button>
              </div>
            ))}
          </div>
          
          <p className="text-xs font-mono text-gray-500">
            CLICK NODES TO ROTATE. ALIGN ALL INDICATORS UPWARDS.
          </p>
        </motion.div>
      )}
      {activePuzzle === 'frequency' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-error-red to-transparent opacity-50" />
          
          <div className="mb-8 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-center">
              {isSuccess ? <Unlock className="mr-3 text-neon-green" /> : <ShieldAlert className="mr-3 text-error-red" />}
              DECRYPT: SECURITY AUDIT
            </h2>
            <p className="text-sm font-mono text-gray-400">
              {isSuccess ? 'VULNERABILITY PATCHED' : 'MATCH SIGNAL FREQUENCIES'}
            </p>
          </div>

          {/* Dynamic Wave Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
            <svg width="120%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} className={isSuccess ? 'text-neon-green' : 'text-error-red'}>
              <motion.path
                d={wavePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ d: wavePath }}
                transition={{ type: "spring", bounce: 0 }}
              />
            </svg>
          </div>

          <div className="flex justify-center gap-8 mb-8 h-48 relative z-10">
            {frequencies.map((freq, i) => {
              const isClose = Math.abs(freq - targetFrequencies[i]) < 5;
              return (
                <div key={i} className="relative h-full w-12 flex justify-center group">
                  {/* Track Background */}
                  <div className="absolute top-0 bottom-0 w-3 bg-white/5 rounded-full overflow-hidden">
                    {/* Fill Bar */}
                    <motion.div 
                      className={`absolute bottom-0 left-0 right-0 rounded-full transition-colors duration-300
                        ${isSuccess ? 'bg-neon-green shadow-[0_0_15px_rgba(114,239,221,0.8)]' : 
                          isClose ? 'bg-error-red shadow-[0_0_15px_rgba(255,77,109,0.8)]' : 'bg-neon-blue/50'}
                      `}
                      style={{ height: `${freq}%` }}
                      layout
                    />
                  </div>
                  
                  {/* Target Line with Pulse */}
                  <div 
                    className="absolute w-full h-1 z-0 flex items-center justify-center"
                    style={{ bottom: `${targetFrequencies[i]}%` }}
                  >
                    <div className={`w-full h-full ${isSuccess ? 'bg-neon-green' : 'bg-error-red/50'}`} />
                    {isClose && !isSuccess && (
                      <motion.div 
                        className="absolute w-full h-1 bg-error-red"
                        animate={{ scaleY: [1, 3, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                  
                  {/* Slider Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={freq}
                    onChange={(e) => handleFrequencyChange(i, parseInt(e.target.value))}
                    disabled={isSuccess}
                    className="absolute cursor-pointer z-20 opacity-0"
                    style={{ 
                      width: '192px',
                      height: '48px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-90deg)',
                      transformOrigin: 'center'
                    }}
                  />
                  
                  {/* Custom Thumb */}
                  <motion.div 
                    animate={isClose && !isSuccess ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className={`absolute w-8 h-4 rounded-sm z-10 pointer-events-none transition-colors duration-300
                      ${isSuccess ? 'bg-neon-green shadow-[0_0_15px_rgba(114,239,221,0.8)]' : 
                        isClose ? 'bg-error-red shadow-[0_0_15px_rgba(255,77,109,0.8)]' : 'bg-white'}
                    `}
                    style={{ bottom: `calc(${freq}% - 8px)` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-1 bg-black/20 rounded-full" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
          
          <p className="text-xs font-mono text-gray-500">
            ADJUST SLIDERS TO MATCH THE TARGET FREQUENCY LINES.
          </p>
        </motion.div>
      )}

      {activePuzzle === 'matrix' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isError ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: isError ? 0.4 : 0.3 }}
          className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center justify-center">
              {isSuccess ? <Unlock className="mr-3 text-neon-green" /> : <Network className="mr-3 text-neon-blue" />}
              DECRYPT: AI CORE
            </h2>
            <p className="text-sm font-mono text-gray-400">
              {isSuccess ? 'NEURAL LINK ESTABLISHED' : 'ISOLATE ACTIVE NODES'}
            </p>
          </div>

          <div className="relative grid grid-cols-3 gap-4 mb-8 [perspective:1000px] p-4">
            {/* Matrix Scanner Line */}
            {matrixShowing && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-neon-blue shadow-[0_0_20px_rgba(76,201,240,1)] z-50 pointer-events-none"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
              />
            )}

            {Array.from({ length: 9 }).map((_, i) => {
              const isTarget = matrixTarget.includes(i);
              const isSelected = matrixSelected.includes(i);
              
              let bgColor = 'bg-white/5';
              let borderColor = 'border-white/10';
              let shadow = '';

              if (matrixShowing && isTarget) {
                bgColor = 'bg-neon-blue/40';
                borderColor = 'border-neon-blue';
                shadow = 'shadow-[0_0_20px_rgba(76,201,240,0.6)]';
              } else if (isSuccess && isSelected) {
                bgColor = 'bg-neon-green/40';
                borderColor = 'border-neon-green';
                shadow = 'shadow-[0_0_20px_rgba(114,239,221,0.6)]';
              } else if (isError && isSelected && !isTarget) {
                bgColor = 'bg-error-red/40';
                borderColor = 'border-error-red';
                shadow = 'shadow-[0_0_20px_rgba(255,77,109,0.6)]';
              } else if (isSelected && isTarget) {
                bgColor = 'bg-neon-blue/30';
                borderColor = 'border-neon-blue/80';
              }

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    rotateY: (matrixShowing && isTarget) || isSelected ? 180 : 0,
                    scale: isSelected ? 0.95 : 1
                  }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  onClick={() => handleMatrixClick(i)}
                  disabled={matrixShowing || isSuccess}
                  className={`
                    aspect-square rounded-xl border transition-colors duration-300 [transform-style:preserve-3d]
                    ${bgColor} ${borderColor} ${shadow}
                  `}
                >
                  {/* Inner glowing core that appears when flipped */}
                  {((matrixShowing && isTarget) || isSelected) && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="w-1/3 h-1/3 mx-auto rounded-full bg-white/50 blur-[2px]"
                      style={{ transform: 'rotateY(180deg)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          
          <p className="text-xs font-mono text-gray-500">
            {matrixShowing ? 'MEMORIZE THE ACTIVE NODES...' : 'SELECT THE ACTIVE NODES.'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
