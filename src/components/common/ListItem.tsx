import { ReactNode } from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface ListItemProps {
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: LucideIcon;
  onPress?: () => void;
  children?: ReactNode;
  showChevron?: boolean;
}

export function ListItem({ 
  title, 
  subtitle, 
  meta, 
  icon: Icon, 
  onPress, 
  children,
  showChevron = true 
}: ListItemProps) {
  const Component = onPress ? 'button' : 'div';
  
  return (
    <Component
      className={`flex items-center justify-between p-4 ${onPress ? 'hover:bg-chip transition-colors cursor-pointer' : ''}`}
      onClick={onPress}
    >
      <div className="flex items-center gap-3 flex-1">
        {Icon && <Icon className="w-5 h-5 text-accent flex-shrink-0" />}
        <div className="flex-1 min-w-0">
          <div className="text-text font-medium">{title}</div>
          {subtitle && <div className="text-sm text-muted">{subtitle}</div>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {meta && <span className="text-sm text-muted">{meta}</span>}
        {children}
        {onPress && showChevron && <ChevronRight className="w-4 h-4 text-muted" />}
      </div>
    </Component>
  );
}