interface SleepScoreRingProps {
  score: number;
  size?: number;
}

export function SleepScoreRing({ score, size = 128 }: SleepScoreRingProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'hsl(var(--sleep-excellent))';
    if (score >= 70) return 'hsl(var(--sleep-good))';
    if (score >= 50) return 'hsl(var(--sleep-fair))';
    return 'hsl(var(--sleep-poor))';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const circumference = 2 * Math.PI * 45; // radius of 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--chip))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-text">{score}</span>
          <span className="text-xs text-muted uppercase tracking-wide">
            {getScoreLabel(score)}
          </span>
        </div>
      </div>
    </div>
  );
}