'use client';

import { motion } from 'motion/react';
import { useSystemStore } from '@/store/systemStore';
import { Lock, Unlock, Terminal, Cpu, Database, Network, User, ShieldAlert, BrainCircuit } from 'lucide-react';

const PROJECTS = [
  { id: 'core', title: 'Escape Director Client', icon: Cpu, level: 0, puzzleType: null },
  { id: 'data', title: 'Telemetry Service', icon: Database, level: 1, puzzleType: 'auth' },
  { id: 'terminal', title: 'System Logs Analyzer', icon: Terminal, level: 2, puzzleType: 'network' },
  { id: 'security', title: 'Security Audit Tool', icon: ShieldAlert, level: 3, puzzleType: 'frequency' },
  { id: 'ai', title: 'AI Core Logic', icon: BrainCircuit, level: 4, puzzleType: 'matrix' },
  { id: 'contact', title: 'Creator Identity', icon: User, level: 0, puzzleType: null },
];

export default function SystemHub() {
  const { accessLevel, unlockedModules, openProject, openPuzzle } = useSystemStore();

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 font-sans relative">
      <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            PROJECT_DB
          </h1>
          <p className="text-sm font-mono text-neon-blue glow-text-blue">
            STATUS: INFILTRATED | THREAT LEVEL: LOW
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-gray-400 uppercase">Access Level</p>
          <p className="text-2xl md:text-4xl font-bold text-neon-purple">
            0{accessLevel}
          </p>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {PROJECTS.map((proj, index) => {
          // A project is locked if it has a puzzleType AND hasn't been unlocked yet
          const isLocked = proj.puzzleType !== null && !unlockedModules.includes(proj.id);
          const Icon = proj.icon;

          return (
            <motion.button
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (isLocked) {
                  openPuzzle(proj.id);
                } else {
                  openProject(proj.id);
                }
              }}
              className={`
                relative p-8 text-left rounded-2xl transition-all duration-500
                glass-panel group overflow-hidden
                ${isLocked ? 'hover:border-error-red/50' : 'hover:scale-[1.02] cursor-pointer glass-panel-active'}
              `}
            >
              {/* Background gradient effect on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isLocked ? 'bg-error-red' : 'bg-neon-blue'}`} />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-4 rounded-xl ${isLocked ? 'bg-gray-800/50 text-gray-400' : 'bg-neon-blue/10 text-neon-blue'}`}>
                  <Icon size={32} />
                </div>
                {isLocked ? (
                  <div className="flex items-center text-error-red bg-error-red/10 px-3 py-1 rounded-full text-xs font-mono">
                    <Lock size={14} className="mr-2" />
                    ENCRYPTED
                  </div>
                ) : (
                  <div className="flex items-center text-neon-green bg-neon-green/10 px-3 py-1 rounded-full text-xs font-mono">
                    <Unlock size={14} className="mr-2" />
                    ACCESSIBLE
                  </div>
                )}
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 relative z-10 ${isLocked ? 'text-gray-400' : 'text-white'}`}>
                {proj.title}
              </h3>
              <p className="text-sm font-mono text-gray-500 uppercase relative z-10">
                Security Level: {proj.level}
              </p>

              {isLocked && (
                <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                  <p className="text-xs font-mono text-error-red flex items-center">
                    <Terminal size={12} className="mr-2" />
                    Click to initiate decryption sequence
                  </p>
                </div>
              )}
            </motion.button>
          );
        })}
      </main>
    </div>
  );
}
