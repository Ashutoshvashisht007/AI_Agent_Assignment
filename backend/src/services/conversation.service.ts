import { query } from './db';

export async function createConversation(userId: string) {
  const res = await query(
    'INSERT INTO conversations (user_id) VALUES ($1) RETURNING id',
    [userId]
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

export async function getConversationHistory(conversationId: string, userId: string, limit = 20) {
  const res = await query(
    `SELECT m.sender, m.text, m.created_at
    FROM messages m
    JOIN conversations c ON m.conversation_id = c.id
    WHERE c.id = $1 AND c.user_id = $2
    ORDER BY m.created_at ASC
    LIMIT $3
`,
    [conversationId, userId, limit]
  );
  return res.rows;
}

export async function conversationExists(id: string, userId: string): Promise<boolean> {
  const res = await query(
    'SELECT 1 FROM conversations WHERE id = $1 AND user_id = $2',
    [id, userId]
  );

  return (res.rowCount ?? 0) > 0;
}

export async function getRecentConversations(
  userId: string,
  limit = 20
) {
  const res = await query(
    `
    SELECT
      c.id,
      c.created_at,
      COALESCE(
        MIN(m.text) FILTER (WHERE m.sender = 'user'),
        'New chat'
      ) AS title
    FROM conversations c
    LEFT JOIN messages m ON m.conversation_id = c.id
    WHERE c.user_id = $1
    GROUP BY c.id
    ORDER BY c.created_at DESC
    LIMIT $2
    `,
    [userId, limit]
  );

  return res.rows;
}
