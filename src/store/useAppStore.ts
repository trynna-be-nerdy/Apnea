import { create } from 'zustand';
import { AudioStatus, NightSummary, CaffeineEntry, ChatMessage, DiaryEntry } from '../types';

interface AppState {
  // Audio recording state
  audioStatus: AudioStatus;
  setAudioStatus: (status: AudioStatus) => void;
  
  // Current night summary
  currentNight: NightSummary | null;
  setCurrentNight: (night: NightSummary) => void;
  
  // Tonight's plan
  targetBedtime: string;
  wakeTime: string;
  setTimes: (bedtime: string, wake: string) => void;
  
  // Caffeine entries
  caffeineEntries: CaffeineEntry[];
  addCaffeineEntry: (entry: CaffeineEntry) => void;
  
  // Chat messages
  chatMessages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  
  // Diary entries
  diaryEntries: DiaryEntry[];
  addDiaryEntry: (entry: DiaryEntry) => void;
  
  // Settings
  onDeviceOnly: boolean;
  windDownReminder: boolean;
  wakeAlarm: boolean;
  setSettings: (settings: Partial<Pick<AppState, 'onDeviceOnly' | 'windDownReminder' | 'wakeAlarm'>>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Audio
  audioStatus: 'idle',
  setAudioStatus: (status) => set({ audioStatus: status }),
  
  // Night summary
  currentNight: null,
  setCurrentNight: (night) => set({ currentNight: night }),
  
  // Times
  targetBedtime: '23:15',
  wakeTime: '06:30',
  setTimes: (bedtime, wake) => set({ targetBedtime: bedtime, wakeTime: wake }),
  
  // Caffeine
  caffeineEntries: [],
  addCaffeineEntry: (entry) => set((state) => ({ 
    caffeineEntries: [...state.caffeineEntries, entry] 
  })),
  
  // Chat
  chatMessages: [],
  addMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message]
  })),
  
  // Diary
  diaryEntries: [],
  addDiaryEntry: (entry) => set((state) => ({
    diaryEntries: [...state.diaryEntries, entry]
  })),
  
  // Settings
  onDeviceOnly: true,
  windDownReminder: true,
  wakeAlarm: true,
  setSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));