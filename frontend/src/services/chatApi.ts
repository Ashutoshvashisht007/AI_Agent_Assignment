const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function sendMessage(message: string, sessionId?: string) {
  const res = await fetch(`${API_BASE}/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json(); // { sessionId, reply }
}

export async function fetchHistory(sessionId: string) {
  const res = await fetch(`${API_BASE}/chat/history/${sessionId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }
  return res.json();
}
