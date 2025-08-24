import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SleepScoreRing } from '../SleepScoreRing';
import { SleepCard } from '../SleepCard';
import { Chip } from '../common/Chip';
import { Moon, Sun, Clock, TrendingUp, Wind, Zap, Coffee, Play, Shield } from 'lucide-react';
import { HistoryService, CaffeineService } from '../../services/mockServices';
import { useAppStore } from '../../store/useAppStore';
import { NightSummary, CaffeineStatus } from '../../types';

export function HomeScreen() {
  const navigate = useNavigate();
  const { targetBedtime, wakeTime } = useAppStore();
  const [lastNight, setLastNight] = useState<NightSummary | null>(null);
  const [caffeineStatus, setCaffeineStatus] = useState<CaffeineStatus>('OK');
  const [remainingCaffeine, setRemainingCaffeine] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const nights = await HistoryService.listNights();
      if (nights.length > 0) {
        setLastNight(nights[nights.length - 1]);
      }
      
      const status = await CaffeineService.statusNow();
      setCaffeineStatus(status);
      
      const remaining = await CaffeineService.getRemainingMg();
      setRemainingCaffeine(remaining);
    };
    
    loadData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCaffeineStatusColor = (status: CaffeineStatus) => {
    switch (status) {
      case 'OK': return 'text-sleep-excellent';
      case 'TooLate': return 'text-sleep-fair';
      case 'OverLimit': return 'text-sleep-poor';
    }
  };

  if (!lastNight) return <div className="flex-1 bg-bg p-4">Loading...</div>;

  return (
    <div className="flex-1 bg-bg p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-1">
            {getGreeting()}, Sarah
          </h1>
          <p className="text-muted">{formatDate(new Date().toISOString())}</p>
        </div>

        {/* Previous Night Card */}
        <SleepCard title="Last Night's Sleep">
          <div className="flex flex-col items-center space-y-4">
            <SleepScoreRing score={lastNight.sleepScore} />
            
            <div className="w-full grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <div className="text-text font-medium">{Math.round(lastNight.se * 100)}%</div>
                <div className="text-muted">Sleep Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-text font-medium">{lastNight.solMin}m</div>
                <div className="text-muted">Sleep Onset</div>
              </div>
              <div className="text-center">
                <div className="text-text font-medium">{Math.round(lastNight.snorePct * 100)}%</div>
                <div className="text-muted">Snore</div>
              </div>
              <div className="text-center">
                <div className="text-text font-medium">{lastNight.apneaSuspectPerHour}/h</div>
                <div className="text-muted">Pauses</div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/morning-report')}
              className="text-accent text-sm hover:underline"
            >
              View full report →
            </button>
          </div>
        </SleepCard>

        {/* Record Sleep - Prominent CTA */}
        <SleepCard title="" className="bg-accent/10 border-accent/20">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-2">
              <Play className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text mb-2">Record Sleep</h3>
              <p className="text-sm text-muted mb-4">
                Start tonight's sleep session with on-device audio analysis
              </p>
            </div>
            <button 
              onClick={() => navigate('/night-session')}
              className="btn btn-accent w-full text-base font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Night Session
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-muted">
              <Shield className="w-3 h-3" />
              <span>On-device analysis • No raw audio upload</span>
            </div>
          </div>
        </SleepCard>

        {/* Tonight's Plan */}
        <SleepCard title="Tonight's Plan">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-accent" />
                <span className="text-text">Target bedtime</span>
              </div>
              <span className="chip">
                <Clock className="w-4 h-4" />
                {targetBedtime}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-accent" />
                <span className="text-text">Wake time</span>
              </div>
              <span className="chip">
                <Clock className="w-4 h-4" />
                {wakeTime}
              </span>
            </div>
          </div>
        </SleepCard>

        {/* Routine Starter */}
        <SleepCard title="Wind-Down Routine">
          <div className="flex flex-wrap gap-2">
            <Chip 
              label="20 min" 
              icon={Wind}
              onClick={() => navigate('/routine?duration=20')}
            />
            <Chip 
              label="30 min" 
              icon={Wind}
              onClick={() => navigate('/routine?duration=30')}
            />
            <Chip 
              label="45 min" 
              icon={Wind}
              onClick={() => navigate('/routine?duration=45')}
            />
          </div>
        </SleepCard>

        {/* Caffeine Status */}
        <SleepCard title="Caffeine Today">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5 text-accent" />
              <div>
                <div className={`font-medium ${getCaffeineStatusColor(caffeineStatus)}`}>
                  {caffeineStatus}
                </div>
                <div className="text-sm text-muted">
                  {remainingCaffeine}mg remaining
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/caffeine')}
              className="chip"
            >
              View Details
            </button>
          </div>
        </SleepCard>

        {/* Tip of the Night */}
        <SleepCard title="Tip of the Night">
          <p className="text-sm text-muted">
            Keep your bedroom temperature between 65-68°F for optimal sleep quality.
          </p>
        </SleepCard>
      </div>
    </div>
  );
}