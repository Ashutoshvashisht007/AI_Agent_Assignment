import type { Message } from '../../types/types';
import { MessageItem } from './MessageItem';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isHistoryLoading?: boolean;
}

export const MessageList = ({ messages, isLoading, isHistoryLoading }: MessageListProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-32 pt-4">
      {isHistoryLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
              <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/2"></div>
            </div>
          </div>
        ))
      ) : (
        messages.map((m) => (
          <MessageItem key={m.id} message={m} />
        ))
      )}
      
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex gap-4"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <Bot size={18} className="text-white" />
          </div>
          <div className="bg-slate-100 dark:bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-duration:0.8s]" />
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
          </div>
        </motion.div>
      )}
    </div>
  );
};