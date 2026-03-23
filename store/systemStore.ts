import { create } from 'zustand';

export type AccessLevel = 0 | 1 | 2 | 3 | 4 | 5;

interface SystemState {
  isBooting: boolean;
  accessLevel: AccessLevel;
  currentView: 'boot' | 'hub' | 'project' | 'puzzle';
  activeProject: string | null;
  unlockedModules: string[];
  
  completeBoot: () => void;
  setAccessLevel: (level: AccessLevel) => void;
  setView: (view: 'boot' | 'hub' | 'project' | 'puzzle') => void;
  openProject: (id: string) => void;
  openPuzzle: (id: string) => void;
  unlockModule: (id: string) => void;
  returnToHub: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  isBooting: true,
  accessLevel: 0,
  currentView: 'boot',
  activeProject: null,
  unlockedModules: [],
  
  completeBoot: () => set({ isBooting: false, currentView: 'hub' }),
  setAccessLevel: (level) => set({ accessLevel: level }),
  setView: (view) => set({ currentView: view }),
  openProject: (id) => set({ currentView: 'project', activeProject: id }),
  openPuzzle: (id) => set({ currentView: 'puzzle', activeProject: id }), // Use activeProject for puzzle too
  unlockModule: (id) => set((state) => ({ 
    unlockedModules: state.unlockedModules.includes(id) 
      ? state.unlockedModules 
      : [...state.unlockedModules, id] 
  })),
  returnToHub: () => set({ currentView: 'hub', activeProject: null }),
}));
