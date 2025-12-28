import { Sun, Moon, Sparkles, Menu } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const Header = ({ isDarkMode, toggleTheme, toggleSidebar }: HeaderProps) => (
  <nav className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f0f0f] sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <button 
        onClick={toggleSidebar}
        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg md:hidden"
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Sparkles className="text-white" size={16} />
        </div>
        <span>Spur <span className="text-blue-600">AI Agent</span></span>
      </div>
    </div>

    <button 
      onClick={toggleTheme}
      className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
    </button>
  </nav>
);