import { Send } from 'lucide-react';

interface Props {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ input, setInput, onSend, isLoading }: Props) => (
  <div className="max-w-3xl mx-auto relative group">
    <textarea
      rows={1}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      }}
      placeholder="Ask me anything..."
      className="w-full p-4 pr-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-xl transition-all"
    />
    <button
      disabled={isLoading || !input.trim()}
      onClick={onSend}
      className="absolute right-3 top-3 p-2 bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
    >
      <Send size={18} />
    </button>
  </div>
);