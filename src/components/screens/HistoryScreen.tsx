import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SleepCard } from '../SleepCard';
import { ListItem } from '../common/ListItem';
import { Calendar, TrendingUp, Moon, BarChart3 } from 'lucide-react';
import { HistoryService } from '../../services/mockServices';
import { NightSummary, WeeklyMetrics } from '../../types';

export function HistoryScreen() {
  const navigate = useNavigate();
  const [nights, setNights] = useState<NightSummary[]>([]);
  const [weeklyMetrics, setWeeklyMetrics] = useState<WeeklyMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [nightsData, metricsData] = await Promise.all([
        HistoryService.listNights(),
        HistoryService.getWeeklyMetrics()
      ]);
      setNights(nightsData.reverse()); // Most recent first
      setWeeklyMetrics(metricsData);
      setLoading(false);
    };
    
    loadData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSleepScoreColor = (score: number) => {
    if (score >= 85) return 'text-sleep-excellent';
    if (score >= 70) return 'text-sleep-good';
    if (score >= 50) return 'text-sleep-fair';
    return 'text-sleep-poor';
  };

  if (loading) {
    return (
      <div className="flex-1 bg-bg p-4 pb-20">
        <div className="max-w-md mx-auto">
          <div className="text-center py-8">
            <p className="text-muted">Loading history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-bg p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-1">Sleep History</h1>
          <p className="text-muted">{nights.length} nights recorded</p>
        </div>

        {/* Weekly Summary */}
        {weeklyMetrics && (
          <SleepCard title="This Week's Averages">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-text font-medium">{Math.round(weeklyMetrics.avgSE * 100)}%</div>
                <div className="text-muted">Sleep Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-text font-medium">{weeklyMetrics.avgSOL}m</div>
                <div className="text-muted">Sleep Onset</div>
              </div>
              <div className="text-center">
                <div className="text-text font-medium">{weeklyMetrics.avgWASO}m</div>
                <div className="text-muted">Wake Time</div>
              </div>
              <div className="text-center">
                <div className="text-text font-medium">{Math.round(weeklyMetrics.adherence * 100)}%</div>
                <div className="text-muted">Adherence</div>
              </div>
            </div>
          </SleepCard>
        )}

        {/* Sleep History List */}
        <SleepCard title="Recent Nights">
          <div className="divide-y divide-border">
            {nights.map((night) => (
              <ListItem
                key={night.date}
                title={formatDate(night.date)}
                subtitle={`${Math.round(night.se * 100)}% efficiency • ${night.solMin}m onset`}
                meta={`${Math.round(night.snorePct * 100)}% snore`}
                icon={Moon}
                onPress={() => navigate(`/morning-report?date=${night.date}`)}
              >
                <div className={`text-lg font-bold ${getSleepScoreColor(night.sleepScore)}`}>
                  {night.sleepScore}
                </div>
              </ListItem>
            ))}
          </div>
        </SleepCard>

        {/* Trends Button */}
        <button 
          onClick={() => navigate('/trends')}
          className="w-full btn btn-accent"
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          View Trends & Analytics
        </button>
      </div>
    </div>
  );
}