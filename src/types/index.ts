// Shared types
export type NightSummary = {
  date: string;
  sleepScore: number;      // 0..100
  snorePct: number;        // 0..1
  apneaSuspectPerHour: number;
  longestPauseSec: number;
  se: number;              // sleep efficiency 0..1
  solMin: number;
  wasoMin: number;
};

export type WeeklyMetrics = {
  avgSE: number;
  avgSOL: number;
  avgWASO: number;
  adherence: number;
};

export type CaffeineEntry = { 
  id: string; 
  time: string; 
  mg: number; 
  source: string; 
};

export type CaffeineStatus = 'OK' | 'TooLate' | 'OverLimit';

export type AudioStatus = 'idle' | 'listening' | 'paused';

export type DiaryEntry = {
  date: string;
  inBed: string;
  asleep: string;
  wakes: number;
  finalWake: string;
  outOfBed: string;
  quality: number; // 1-5
  solMin?: number;
  wasoMin?: number;
  notes?: string;
};

export type RoutineType = 'breathing' | 'pmr' | 'bodyscan' | 'journaling';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  contextCards?: ContextCard[];
};

export type ContextCard = {
  type: 'metrics' | 'sleep-window' | 'routine' | 'caffeine';
  title: string;
  data: any;
  actions?: { label: string; action: string }[];
};