const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function sendMessage(message: string, sessionId?: string) {
  const userId = localStorage.getItem('guestUserId');

  const res = await fetch(`${API_BASE}/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      sessionId,
      userId,
    }),
  });

  return res.json();
}

export async function fetchHistory(sessionId: string, userId: string) {
  const res = await fetch(`${API_BASE}/chat/history/${sessionId}?userId=${userId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }
  return res.json();
}
