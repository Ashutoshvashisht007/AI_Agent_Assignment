import { useState, useEffect } from 'react';
import type { Message } from './types/types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MessageList } from './components/chat/MessageList';
import { LandingScreen } from './components/chat/LandingScreen';
import { ChatInput } from './components/chat/ChatInput';
import { sendMessage, fetchHistory } from './services/chatApi';

import { useAutoScroll } from './hooks/useAutoScroll';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollContainerRef = useAutoScroll(messages);

  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('sessionId')
  );

  useEffect(() => {
    if (!sessionId || messages.length > 0) return;

    fetchHistory(sessionId)
      .then((data) => {
        const mapped = data.messages.map((m: any) => ({
          id: crypto.randomUUID(),
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(mapped);
      })
      .catch(console.error);
  }, [sessionId]);


  const handleSend = async (content: string = input) => {
    const messageContent = content.trim();
    if (!messageContent || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await sendMessage(messageContent, sessionId || undefined);

      if (!sessionId) {
        setSessionId(res.sessionId);
        localStorage.setItem('sessionId', res.sessionId);
      }

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: res.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleNewChat = () => {
    setMessages([]);
    setIsSidebarOpen(false);
    setSessionId(null);
    localStorage.removeItem('sessionId');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`flex h-screen bg-white dark:bg-[#0f0f0f] text-slate-900 dark:text-slate-100 font-['Inter',sans-serif] overflow-hidden transition-colors duration-300`}>

      <Sidebar
        isOpen={isSidebarOpen}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scrollbar-hide custom-scrollbar"
        >
          {messages.length === 0 ? (
            <LandingScreen onSuggestionClick={(text) => handleSend(text)} />
          ) : (
            <div className="px-4">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
          )}
        </main>

        <footer className="p-4 md:p-6 bg-linear-to-t from-white dark:from-[#0f0f0f] via-white dark:via-[#0f0f0f] to-transparent">
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={() => handleSend()}
            isLoading={isLoading}
          />
        </footer>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;