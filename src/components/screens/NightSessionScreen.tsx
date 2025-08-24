import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Square, Shield, Mic } from 'lucide-react';
import { SleepCard } from '../SleepCard';
import { SNRBadge } from '../common/SNRBadge';
import { WaveVu } from '../common/WaveVu';
import { AudioService } from '../../services/mockServices';
import { useAppStore } from '../../store/useAppStore';

export function NightSessionScreen() {
  const navigate = useNavigate();
  const { audioStatus, setAudioStatus, setCurrentNight } = useAppStore();
  const [snrState, setSNRState] = useState<'quiet' | 'ok' | 'loud'>('quiet');
  const [waveLevel, setWaveLevel] = useState(0);
  const [events, setEvents] = useState<string[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (audioStatus === 'listening') {
      interval = setInterval(() => {
        // Simulate wave activity
        setWaveLevel(Math.random());
        
        // Randomly change SNR state
        const states: ('quiet' | 'ok' | 'loud')[] = ['quiet', 'ok', 'loud'];
        setSNRState(states[Math.floor(Math.random() * states.length)]);
        
        // Occasionally add events
        if (Math.random() < 0.1) {
          const eventTypes = [
            'Snore detected',
            'Possible pause detected',
            'Noise spike detected',
            'Quiet period',
            'Movement detected'
          ];
          const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
          setEvents(prev => [...prev.slice(-4), event]); // Keep last 5 events
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [audioStatus]);

  const handleStart = async () => {
    setAudioStatus('listening');
    setSessionStartTime(new Date());
    await AudioService.start();
  };

  const handlePause = async () => {
    setAudioStatus('paused');
    await AudioService.pause();
  };

  const handleStop = async () => {
    setAudioStatus('idle');
    const summary = await AudioService.stop();
    setCurrentNight(summary);
    navigate('/morning-report');
  };

  const getElapsedTime = () => {
    if (!sessionStartTime) return '00:00:00';
    
    const now = new Date();
    const diff = now.getTime() - sessionStartTime.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 bg-bg p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-text">
            {audioStatus === 'listening' ? 'Listening...' : 
             audioStatus === 'paused' ? 'Paused' : 'Night Session'}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted">On-device processing</span>
          </div>
        </div>

        {/* Status Display */}
        <SleepCard title="">
          <div className="text-center space-y-4">
            {/* Timer */}
            <div className="text-3xl font-mono font-bold text-text">
              {getElapsedTime()}
            </div>
            
            {/* Wave Visualization */}
            {audioStatus !== 'idle' && (
              <div className="bg-chip rounded-2xl p-4">
                <WaveVu level={waveLevel} isActive={audioStatus === 'listening'} />
              </div>
            )}
            
            {/* SNR Badge */}
            {audioStatus !== 'idle' && (
              <div className="flex justify-center">
                <SNRBadge state={snrState} />
              </div>
            )}
          </div>
        </SleepCard>

        {/* Controls */}
        <SleepCard title="Controls">
          <div className="flex justify-center gap-4">
            {audioStatus === 'idle' && (
              <button
                onClick={handleStart}
                className="btn btn-accent flex items-center gap-2 px-8 py-3"
              >
                <Play className="w-5 h-5" />
                Start
              </button>
            )}
            
            {audioStatus === 'listening' && (
              <>
                <button
                  onClick={handlePause}
                  className="btn flex items-center gap-2 px-6 py-3"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
                <button
                  onClick={handleStop}
                  className="btn bg-sleep-poor border-sleep-poor hover:bg-sleep-poor/80 flex items-center gap-2 px-6 py-3"
                >
                  <Square className="w-5 h-5" />
                  End
                </button>
              </>
            )}
            
            {audioStatus === 'paused' && (
              <>
                <button
                  onClick={handleStart}
                  className="btn btn-accent flex items-center gap-2 px-6 py-3"
                >
                  <Play className="w-5 h-5" />
                  Resume
                </button>
                <button
                  onClick={handleStop}
                  className="btn bg-sleep-poor border-sleep-poor hover:bg-sleep-poor/80 flex items-center gap-2 px-6 py-3"
                >
                  <Square className="w-5 h-5" />
                  End
                </button>
              </>
            )}
          </div>
        </SleepCard>

        {/* Event Log */}
        {events.length > 0 && (
          <SleepCard title="Events">
            <div className="space-y-2">
              {events.map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-chip rounded-lg">
                  <Mic className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-text">{event}</span>
                  <span className="text-xs text-muted ml-auto">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </SleepCard>
        )}

        {/* Auto-pause Info */}
        <div className="text-center">
          <p className="text-xs text-muted">
            Session will auto-pause if battery drops below 15% or you leave the screen
          </p>
        </div>
      </div>
    </div>
  );
}