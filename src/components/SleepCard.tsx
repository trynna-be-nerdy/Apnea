import { ReactNode } from 'react';

interface SleepCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function SleepCard({ title, children, className = "" }: SleepCardProps) {
  return (
    <div className={`card ${className}`}>
      <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>
      {children}
    </div>
  );
}