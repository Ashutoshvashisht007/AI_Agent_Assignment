import { Sparkles, Code, Plane, Lightbulb } from 'lucide-react';

const SUGGESTIONS = [
  {
    icon: <Plane className="text-blue-500" />,
    title: "Shipping",
    desc: "Where is my order and how long will delivery take?"
  },
  {
    icon: <Lightbulb className="text-emerald-500" />,
    title: "Returns",
    desc: "How can I return a product and get a refund?"
  },
  {
    icon: <Code className="text-orange-500" />,
    title: "Account",
    desc: "I’m having trouble logging into my account"
  },
];

export const LandingScreen = ({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) => (
  <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto px-4 text-center">
    <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full animate-pulse">
      <Sparkles size={48} className="text-blue-600 dark:text-blue-400" />
    </div>
    <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      How can I help you today?
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {SUGGESTIONS.map((item, i) => (
        <button
          key={i}
          onClick={() => onSuggestionClick(item.desc)}
          className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 text-left hover:border-blue-500 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group cursor-pointer"
        >
          <div className="mb-3">{item.icon}</div>
          <p className="font-semibold text-sm mb-1">{item.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
        </button>
      ))}
    </div>
  </div>
);