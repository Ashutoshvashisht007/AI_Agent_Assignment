import { useState, useEffect, useCallback } from 'react';
import type { Message } from '../types/types';
import { sendMessage, fetchHistory } from '../services/chatApi';

export const useChat = (guestUserId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('sessionId')
  );
  
  useEffect(() => {
    if (!sessionId) {
      setMessages([]);
      setHistoryLoaded(true);
      return;
    }

    setHistoryLoaded(false);
    fetchHistory(sessionId, guestUserId)
      .then((data) => {
        const mapped: Message[] = data.messages.map((m: any) => ({
          id: crypto.randomUUID(),
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(mapped);
      })
      .catch(() => setUiError("Failed to load conversation history"))
      .finally(() => setHistoryLoaded(true));
  }, [sessionId, guestUserId]);

  const send = useCallback(async (content: string) => {
    const messageContent = content.trim();
    if (!messageContent || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
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
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Something went wrong. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isLoading]);

  const createNewChat = () => {
    setMessages([]);
    setSessionId(null);
    localStorage.removeItem('sessionId');
  };

  const loadConversation = (id: string) => {
    setSessionId(id);
    localStorage.setItem('sessionId', id);
  };

  return {
    messages,
    isLoading,
    historyLoaded,
    sessionId,
    uiError,
    setUiError,
    send,
    createNewChat,
    loadConversation
  };
};