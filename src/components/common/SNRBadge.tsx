interface SNRBadgeProps {
  state: 'quiet' | 'ok' | 'loud';
}

export function SNRBadge({ state }: SNRBadgeProps) {
  const getStateConfig = (state: string) => {
    switch (state) {
      case 'quiet':
        return { label: 'Quiet', color: 'bg-sleep-excellent' };
      case 'ok':
        return { label: 'OK', color: 'bg-sleep-good' };
      case 'loud':
        return { label: 'Loud', color: 'bg-sleep-poor' };
      default:
        return { label: 'OK', color: 'bg-sleep-good' };
    }
  };

  const { label, color } = getStateConfig(state);

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color} text-black`}>
      <div className="w-2 h-2 rounded-full bg-black bg-opacity-20 mr-2 animate-pulse" />
      {label}
    </div>
  );
}