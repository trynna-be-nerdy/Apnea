import { NightSummary, WeeklyMetrics, CaffeineEntry, CaffeineStatus, DiaryEntry, ChatMessage } from '../types';

// Mock data
const mockNights: NightSummary[] = [
  { date:'2025-08-18', sleepScore:74, snorePct:0.10, apneaSuspectPerHour:2, longestPauseSec:15, se:0.79, solMin:28, wasoMin:42 },
  { date:'2025-08-19', sleepScore:80, snorePct:0.12, apneaSuspectPerHour:3, longestPauseSec:17, se:0.84, solMin:20, wasoMin:35 },
  { date:'2025-08-20', sleepScore:76, snorePct:0.16, apneaSuspectPerHour:4, longestPauseSec:20, se:0.80, solMin:24, wasoMin:40 },
  { date:'2025-08-21', sleepScore:82, snorePct:0.09, apneaSuspectPerHour:2, longestPauseSec:14, se:0.86, solMin:18, wasoMin:32 },
  { date:'2025-08-22', sleepScore:79, snorePct:0.11, apneaSuspectPerHour:3, longestPauseSec:16, se:0.83, solMin:21, wasoMin:36 },
  { date:'2025-08-23', sleepScore:81, snorePct:0.10, apneaSuspectPerHour:2, longestPauseSec:15, se:0.85, solMin:19, wasoMin:33 },
  { date:'2025-08-24', sleepScore:78, snorePct:0.14, apneaSuspectPerHour:3, longestPauseSec:18, se:0.82, solMin:22, wasoMin:38 },
];

// Audio Service (simulated)
export const AudioService = {
  start: async (opts?: { sampleRate?: number }) => ({ status: 'listening' as const }),
  pause: async () => ({ status: 'paused' as const }),
  stop: async (): Promise<NightSummary> => ({
    date: new Date().toISOString().split('T')[0],
    sleepScore: Math.floor(Math.random() * 30) + 70, // 70-100
    snorePct: Math.random() * 0.2,
    apneaSuspectPerHour: Math.floor(Math.random() * 5),
    longestPauseSec: Math.floor(Math.random() * 15) + 10,
    se: 0.75 + Math.random() * 0.2,
    solMin: Math.floor(Math.random() * 20) + 15,
    wasoMin: Math.floor(Math.random() * 30) + 20,
  }),
};

// Diary Service
export const DiaryService = {
  save: async (entry: DiaryEntry) => {
    // In real app, would save to storage
    console.log('Saving diary entry:', entry);
    return { ok: true };
  },
};

// Coach Service
export const CoachService = {
  suggestWindow: async (metrics: WeeklyMetrics) => ({
    changeMinutes: Math.random() > 0.5 ? 15 : -15,
    targetBedtime: '23:15',
    wake: '06:30'
  }),
  
  sendMessage: async (message: string): Promise<ChatMessage> => {
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      "Based on your recent sleep patterns, I notice your sleep efficiency has been around 82%. This is good, but there's room for improvement.",
      "Your sleep onset time has been averaging 22 minutes. Try the 4-7-8 breathing technique 30 minutes before bed to help you fall asleep faster.",
      "I see some snoring patterns in your recent nights. Consider sleeping on your side and ensure your bedroom humidity is optimal.",
      "Your sleep score has been trending upward this week - great job! Consistency is key for better sleep quality."
    ];
    
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    };
  }
};

// History Service
export const HistoryService = {
  listNights: async (): Promise<NightSummary[]> => mockNights,
  
  getWeeklyMetrics: async (): Promise<WeeklyMetrics> => ({
    avgSE: 0.82,
    avgSOL: 21,
    avgWASO: 36,
    adherence: 0.86,
  }),
};

// Caffeine Service
export const CaffeineService = {
  dailyLimitMg: 400,
  cutoffHourLocal: 14, // 2pm
  
  logEntry: async (entry: Omit<CaffeineEntry, 'id'>): Promise<CaffeineEntry> => ({
    id: Date.now().toString(),
    ...entry,
  }),
  
  listToday: async (): Promise<CaffeineEntry[]> => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Mock entries for today
    return [
      { id:'1', time:'08:10', mg:95, source:'Coffee' },
      { id:'2', time:'12:30', mg:75, source:'Espresso' },
    ];
  },
  
  statusNow: async (): Promise<CaffeineStatus> => {
    const now = new Date();
    const currentHour = now.getHours();
    
    const todayEntries = await CaffeineService.listToday();
    const totalMg = todayEntries.reduce((sum, entry) => sum + entry.mg, 0);
    
    if (totalMg > CaffeineService.dailyLimitMg) return 'OverLimit';
    if (currentHour >= CaffeineService.cutoffHourLocal) {
      const recentEntries = todayEntries.filter(entry => {
        const entryHour = parseInt(entry.time.split(':')[0]);
        return entryHour >= CaffeineService.cutoffHourLocal;
      });
      if (recentEntries.length > 0) return 'TooLate';
    }
    
    return 'OK';
  },
  
  getRemainingMg: async (): Promise<number> => {
    const todayEntries = await CaffeineService.listToday();
    const totalMg = todayEntries.reduce((sum, entry) => sum + entry.mg, 0);
    return Math.max(0, CaffeineService.dailyLimitMg - totalMg);
  }
};