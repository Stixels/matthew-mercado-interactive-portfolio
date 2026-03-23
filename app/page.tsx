'use client';

import { useSystemStore } from '@/store/systemStore';
import BootSequence from '@/components/BootSequence';
import SystemHub from '@/components/SystemHub';
import ProjectView from '@/components/ProjectView';
import PuzzleView from '@/components/PuzzleView';
import { AnimatePresence, motion } from 'motion/react';

export default function Home() {
  const currentView = useSystemStore((state) => state.currentView);

  return (
    <AnimatePresence mode="wait">
      {currentView === 'boot' && (
        <motion.div
          key="boot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BootSequence />
        </motion.div>
      )}
      {currentView === 'hub' && (
        <motion.div
          key="hub"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <SystemHub />
        </motion.div>
      )}
      {currentView === 'project' && (
        <motion.div
          key="project"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectView />
        </motion.div>
      )}
      {currentView === 'puzzle' && (
        <motion.div
          key="puzzle"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <PuzzleView />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
