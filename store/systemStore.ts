import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AccessLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface SystemState {
  accessLevel: AccessLevel;
  unlockedModules: string[];
  unlockModule: (id: string) => void;
  setAccessLevel: (level: AccessLevel) => void;
  resetPuzzleProgress: () => void;
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      accessLevel: 0,
      unlockedModules: [],
      unlockModule: (id) =>
        set((state) => ({
          unlockedModules: state.unlockedModules.includes(id)
            ? state.unlockedModules
            : [...state.unlockedModules, id],
        })),
      setAccessLevel: (level) => set({ accessLevel: level }),
      resetPuzzleProgress: () => set({ unlockedModules: [], accessLevel: 0 }),
    }),
    { name: 'portfolio-store' }
  )
);
