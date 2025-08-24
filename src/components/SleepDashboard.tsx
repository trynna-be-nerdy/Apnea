import { SleepScoreRing } from './SleepScoreRing';
import { SleepCard } from './SleepCard';
import { Moon, Sun, Clock, TrendingUp, Wind, Zap } from 'lucide-react';

export function SleepDashboard() {
  const sleepScore = 78;
  const lastNightHours = 7.2;
  const avgBedtime = "11:15 PM";
  const avgWakeTime = "6:30 AM";

  return (
    <div className="min-h-screen bg-bg p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
            Good Evening, Sarah
          </h1>
          <p className="text-muted">Ready for another great night's sleep?</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sleep Score */}
          <SleepCard title="Last Night's Sleep" className="lg:col-span-1">
            <div className="flex flex-col items-center">
              <SleepScoreRing score={sleepScore} />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted">
                  {lastNightHours} hours • Deep sleep 2.1h
                </p>
              </div>
            </div>
          </SleepCard>

          {/* Tonight's Plan */}
          <SleepCard title="Tonight's Session" className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-accent" />
                  <span className="text-text">Target bedtime</span>
                </div>
                <span className="chip">
                  <Clock className="w-4 h-4" />
                  {avgBedtime}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-accent" />
                  <span className="text-text">Wake time</span>
                </div>
                <span className="chip">
                  <Clock className="w-4 h-4" />
                  {avgWakeTime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-accent" />
                  <span className="text-text">Wind-down routine</span>
                </div>
                <span className="chip">30 minutes</span>
              </div>

              <button className="btn btn-accent w-full mt-6 text-base font-semibold">
                <Zap className="w-5 h-5 mr-2" />
                Start Night Session
              </button>
            </div>
          </SleepCard>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SleepCard title="Weekly Average">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-text">7.4h</div>
                <div className="text-sm text-muted">Sleep duration</div>
              </div>
              <div className="flex items-center gap-1 text-sleep-good">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+0.3h</span>
              </div>
            </div>
          </SleepCard>

          <SleepCard title="Sleep Efficiency">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-text">89%</div>
                <div className="text-sm text-muted">Time asleep</div>
              </div>
              <div className="w-16 h-2 bg-chip rounded-full overflow-hidden">
                <div className="w-[89%] h-full bg-sleep-excellent rounded-full"></div>
              </div>
            </div>
          </SleepCard>

          <SleepCard title="REM Sleep">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-text">1.8h</div>
                <div className="text-sm text-muted">Last night</div>
              </div>
              <div className="text-sm text-sleep-good">Optimal</div>
            </div>
          </SleepCard>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button className="chip hover:bg-accent hover:text-black transition-all">
            <Moon className="w-4 h-4" />
            Sleep Sounds
          </button>
          <button className="chip hover:bg-accent hover:text-black transition-all">
            <Wind className="w-4 h-4" />
            Meditation
          </button>
          <button className="chip hover:bg-accent hover:text-black transition-all">
            <TrendingUp className="w-4 h-4" />
            Sleep Trends
          </button>
        </div>
      </div>
    </div>
  );
}