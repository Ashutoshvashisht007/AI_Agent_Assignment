import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MessageList } from './components/chat/MessageList';
import { LandingScreen } from './components/chat/LandingScreen';
import { ChatInput } from './components/chat/ChatInput';
import { useAutoScroll } from './hooks/useAutoScroll';
import { InlineError } from './components/ui/InlineError';
import { useChat } from './hooks/useChat';

const App = () => {
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshSidebarKey, setRefreshSidebarKey] = useState(0);

  const getGuestUserId = () => {
    let id = localStorage.getItem('guestUserId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('guestUserId', id);
    }
    return id;
  };

  const guestUserId = getGuestUserId();

  const {
    messages, isLoading, historyLoaded, sessionId, uiError,
    setUiError, send, createNewChat, loadConversation
  } = useChat(guestUserId);

  const scrollContainerRef = useAutoScroll(messages);

  const handleSendAction = async (content?: string) => {
    const text = content || input;
    if (!text.trim()) return;
    setInput('');
    send(text);
    if (!sessionId) {
      setRefreshSidebarKey(prev => prev + 1);
    }
  };


  return (
    <>
      <div className={`flex h-screen bg-white dark:bg-[#0f0f0f] text-slate-900 dark:text-slate-100 font-['Inter',sans-serif] overflow-hidden transition-colors duration-300`}>

        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onNewChat={createNewChat}
          onSelectConversation={loadConversation}
          sessionId={sessionId}
          refreshKey={refreshSidebarKey}
        />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <Header
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {uiError && (<InlineError message={uiError} onClose={() => setUiError(null)} />)}

          <main
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scrollbar-hide custom-scrollbar"
          >
            {messages.length === 0 && !sessionId ? (
              <div className="py-4 md:py-0 md:flex md:items-center md:justify-center h-full">
                <LandingScreen onSuggestionClick={handleSendAction} />
              </div>
            ) : (
              <div className="px-4">
                <MessageList messages={messages} isLoading={isLoading} isHistoryLoading={!historyLoaded && !!sessionId} />
              </div>
            )}
          </main>

          <footer className="p-4 md:p-6 bg-linear-to-t from-white dark:from-[#0f0f0f] via-white dark:via-[#0f0f0f] to-transparent">
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={() => handleSendAction()}
              isLoading={isLoading}
            />
          </footer>

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-10 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;