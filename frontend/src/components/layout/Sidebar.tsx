import { Plus, MessageSquare, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Conversation } from '../../types/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface SidebarProps {
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  sessionId: string | null;
}

export const Sidebar = ({ onNewChat, isOpen, setIsOpen, onSelectConversation, sessionId }: SidebarProps) => {
  const [history, setHistory] = useState<Conversation[]>([]);
  const [selected,setSelected] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem('guestUserId');
    if(sessionId){
      setSelected(sessionId);
    }
    if (!userId) return;

    fetch(`${API_BASE}/chat/conversations?userId=${userId}`)
      .then(res => res.json())
      .then(data => setHistory(data.conversations))
      .catch(console.error);
  }, []);

  return (
    <aside className={`
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0 fixed md:static inset-y-0 left-0 z-20
      w-72 bg-slate-50 dark:bg-[#171717] border-r border-slate-200 dark:border-white/10 
      transition-transform duration-300 ease-in-out flex flex-col
    `}>
      <div className="p-4 flex items-center justify-between gap-3">
        <button
          onClick={onNewChat}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:shadow-md transition-all text-sm font-medium"
        >
          <Plus size={18} className="text-blue-600" /> New Chat
        </button>
        <button onClick={() => setIsOpen(false)} className='font-semibold rounded-full bg-neutral-800 px-2 py-0.5 flex items-center justify-center cursor-pointer md:hidden'>
          X
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent</p>
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => {onSelectConversation(item.id), setSelected(item.id)}}
            className={`flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-white/5 transition-colors text-sm text-left truncate group ${item.id === selected ? 'bg-slate-200 dark:bg-white/5 font-medium' : ''}`}
          >
            <MessageSquare size={16} className="text-slate-400 group-hover:text-blue-500" />
            <span className="truncate">{item.title ?? 'New conversation'}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-2">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/5 text-sm transition-colors">
          <Settings size={18} /> Settings
        </button>
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User size={18} className="text-blue-600" />
          </div>
          <span className="text-sm font-medium">Guest User</span>
        </div>
      </div>
    </aside>
  );
};