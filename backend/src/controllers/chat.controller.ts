import { Request, Response } from 'express';
import { conversationExists, createConversation, getConversationHistory, getRecentConversations, saveMessage } from '../services/conversation.service';
import { generateReply } from '../services/llm.service';

export async function chatHandler(req: Request, res: Response) {
  try {
    let { sessionId, message, userId } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long' });
    }
    if (!sessionId) {
      sessionId = await createConversation(userId);
    } else {
      const exists = await conversationExists(sessionId, userId);
      if (!exists) {
        sessionId = await createConversation(userId);
      }
    }

    await saveMessage(sessionId, 'user', message);

    const history = await getConversationHistory(sessionId, userId);
    const reply = await generateReply(history, message);

    await saveMessage(sessionId, 'ai', reply);

    return res.json({
      sessionId,
      reply,
    });
  } catch (err) {
    console.error('chatHandler error:', err);
    return res.status(500).json({
      reply:
        'Sorry, something went wrong while processing your request. Please try again later.',
    });
  }
}

export async function historyHandler(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    const history = await getConversationHistory(sessionId, userId);

    return res.json({
      sessionId,
      messages: history.map(m => ({
        sender: m.sender,
        text: m.text,
        timestamp: m.created_at,
      })),
    });
  } catch (err) {
    console.error('historyHandler error:', err);
    return res.status(500).json({
      error: 'Failed to fetch conversation history',
    });
  }
}

export async function conversationsHandler(req: Request, res: Response) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const conversations = await getRecentConversations(userId);

    return res.json({ conversations });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load conversations' });
  }
}
