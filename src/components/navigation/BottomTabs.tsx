import { Home, History, MessageCircle, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'coach', label: 'Coach', icon: MessageCircle, path: '/coach' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export function BottomTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-elev border-t border-border">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 py-3 px-2 transition-colors ${
                isActive 
                  ? 'text-accent' 
                  : 'text-muted hover:text-text'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}