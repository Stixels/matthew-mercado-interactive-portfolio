'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSystemStore } from '@/store/systemStore';

const BOOT_MESSAGES = [
  { text: 'Initializing system...', delay: 500 },
  { text: 'Loading core modules...', delay: 1200 },
  { text: 'Establishing secure connection...', delay: 2000 },
  { text: 'Verifying credentials...', delay: 2800 },
];

export default function BootSequence() {
  const [messages, setMessages] = useState<string[]>([]);
  const [phase, setPhase] = useState<number>(0);
  const [inputValue, setInputValue] = useState('');
  const completeBoot = useSystemStore((state) => state.completeBoot);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    if (phase === 0) {
      // Phase 1: Initialization
      BOOT_MESSAGES.forEach((msg, index) => {
        const timeout = setTimeout(() => {
          setMessages((prev) => [...prev, msg.text]);
          if (index === BOOT_MESSAGES.length - 1) {
            setTimeout(() => setPhase(1), 800);
          }
        }, msg.delay);
        timeouts.push(timeout);
      });
    } else if (phase === 1) {
      // Phase 2: Auth Failure
      const t1 = setTimeout(() => {
        setMessages((prev) => [...prev, 'Authenticating user...']);
      }, 500);
      const t2 = setTimeout(() => {
        setPhase(2);
      }, 1500);
      timeouts.push(t1, t2);
    } else if (phase === 3) {
      // Phase 3: Detection
      const t1 = setTimeout(() => {
        setMessages((prev) => [...prev, 'Unknown device detected']);
      }, 500);
      const t2 = setTimeout(() => {
        setMessages((prev) => [...prev, 'Origin: External']);
      }, 1200);
      const t3 = setTimeout(() => {
        setMessages((prev) => [...prev, 'Threat level: Low']);
      }, 1900);
      const t4 = setTimeout(() => {
        setPhase(4);
      }, 2600);
      timeouts.push(t1, t2, t3, t4);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [phase]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    
    setMessages((prev) => [...prev, `> ${cmd}`]);
    setInputValue('');

    if (cmd === 'login' || cmd === 'enter' || cmd === 'start') {
      setMessages((prev) => [...prev, 'Bypassing standard authentication...']);
      setTimeout(() => {
        completeBoot();
      }, 1500);
    } else if (cmd === 'help') {
      setMessages((prev) => [
        ...prev,
        'Available commands:',
        '  login - Attempt system access',
        '  scan  - Analyze system vulnerabilities',
        '  help  - Show this message'
      ]);
    } else if (cmd === 'scan') {
      setMessages((prev) => [
        ...prev,
        'Scanning...',
        'Vulnerability found in authentication module.',
        'Type "login" to exploit.'
      ]);
    } else if (cmd !== '') {
      setMessages((prev) => [...prev, `Command not recognized: ${cmd}`]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 md:p-12 font-mono text-sm md:text-base">
      <div className="flex-1 w-full max-w-3xl mx-auto flex flex-col justify-end pb-12">
        <div className="space-y-2 mb-6">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400"
            >
              {msg}
            </motion.div>
          ))}
          
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-error-red font-bold text-xl md:text-2xl my-6 glow-text-red"
                onAnimationComplete={() => setTimeout(() => setPhase(3), 1500)}
              >
                ACCESS DENIED
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {phase === 4 && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleCommand}
            className="flex items-center text-neon-blue"
          >
            <span className="mr-2">&gt;</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-neon-blue placeholder-neon-blue/30"
              placeholder="Enter command (try 'help')"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </motion.form>
        )}
      </div>
    </div>
  );
}
