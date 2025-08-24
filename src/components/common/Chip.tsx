import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ChipProps {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function Chip({ label, icon: Icon, active = false, onClick, children, className = "" }: ChipProps) {
  const baseClasses = active 
    ? "chip bg-accent text-black border-accent" 
    : "chip hover:bg-accent hover:text-black transition-all cursor-pointer";

  return (
    <button 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={!onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
      {children}
    </button>
  );
}