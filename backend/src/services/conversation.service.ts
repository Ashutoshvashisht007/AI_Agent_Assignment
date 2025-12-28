import { query } from './db';

export async function createConversation() {
  const res = await query(
    'INSERT INTO conversations DEFAULT VALUES RETURNING id'
  );
  return res.rows[0].id;
}

export async function saveMessage(
  conversationId: string,
  sender: 'user' | 'ai',
  text: string
) {
  await query(
    `INSERT INTO messages (conversation_id, sender, text)
     VALUES ($1, $2, $3)`,
    [conversationId, sender, text]
  );
}

export async function getConversationHistory(conversationId: string, limit = 20) {
  const res = await query(
    `SELECT sender, text, created_at
     FROM messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC
     LIMIT $2`,
    [conversationId, limit]
  );
  return res.rows;
}

export async function conversationExists(id: string): Promise<boolean> {
  const res = await query(
    'SELECT 1 FROM conversations WHERE id = $1',
    [id]
  );

  return (res.rowCount ?? 0) > 0;
}

