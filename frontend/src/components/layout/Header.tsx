import { Sparkles, Menu } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => (
  <nav className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f0f0f] sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg lg:hidden"
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

    <ThemeToggle />
  </nav>
);
