interface WaveVuProps {
  level: number; // 0-1
  isActive?: boolean;
}

export function WaveVu({ level, isActive = false }: WaveVuProps) {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const barHeight = Math.random() * 0.5 + 0.2; // Random height between 0.2-0.7
    const isLit = i < level * 20;
    
    return (
      <div
        key={i}
        className={`w-1 rounded-full transition-all duration-75 ${
          isActive && isLit 
            ? 'bg-accent' 
            : 'bg-chip'
        }`}
        style={{ 
          height: `${barHeight * 100}%`,
          opacity: isActive ? (isLit ? 1 : 0.3) : 0.5
        }}
      />
    );
  });

  return (
    <div className="flex items-center justify-center gap-0.5 h-12 px-4">
      {bars}
    </div>
  );
}