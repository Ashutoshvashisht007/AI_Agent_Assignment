import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../../types/types';

export const MessageItem = ({ message }: { message: Message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
        isAssistant ? 'bg-emerald-500' : 'bg-blue-600'
      }`}>
        {isAssistant ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
      </div>
      
      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
        isAssistant 
          ? 'bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 rounded-tl-none' 
          : 'bg-blue-600 text-white rounded-tr-none'
      }`}>
        {message.content}
      </div>
    </motion.div>
  );
};