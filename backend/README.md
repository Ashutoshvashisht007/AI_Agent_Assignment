
---


# RAG Chatbot - Backend

This is the backend of the RAG (Retrieval-Augmented Generation) chatbot application built with **Node.js + Express + TypeScript**, using Redis for in-memory caching and Postgres for persistent chat transcripts.

---

## **Tech Stack**

- Node.js 22 + TypeScript
- Express
- Postgres (SQL)
- Redis (in-memory caching)
- Vector Store: Qdrant / Chroma / FAISS
- Embeddings: Jina
- AI API: Gemini
- CORS + Body-Parser
- WebSockets for real-time chat

---

## **Features / API Endpoints**

### **Chat**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/chat | Send user query, get AI response |
| GET    | /api/history/:sessionId | Fetch chat history for a session |
| DELETE | /api/history/:sessionId | Reset session (Redis) |
| POST   | /api/persist/:sessionId | Persist chat history to Postgres |

### **Ingest**

- Endpoint to ingest news articles, create embeddings using Jina, and populate vector store

---

## **Database**

- **Redis:** In-memory session chat storage (TTL configurable)
- **Postgres:** Persistent transcript storage
  - Table: `transcripts`
  - Columns:
    - `id` (UUID)
    - `session_id` (TEXT)
    - `created_at` (TIMESTAMP WITH TIME ZONE)
    - `transcript` (JSONB) → stores [{role, text, ts}]
    - `metadata` (JSONB) → optional

- Create tables using:

```sql
CREATE TABLE IF NOT EXISTS transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  transcript JSONB NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

## **Environment Variables**

Create a `.env` file in the root of the frontend project:

```env
PORT=5000
REDIS_URL=redis://<user>:<password>@<host>:<port>
POSTGRES_URL=postgres://<user>:<password>@<host>:<port>/<db>?sslmode=require
VECTORSTORE_URL=<your_vector_store_url>
JINA_API_KEY=<your_jina_key>
GEMINI_API_KEY=<your_gemini_key>
SESSION_TTL=3600
```

## **Setup & Run Locally**

Install dependencies:

```npm install```


Start development server:

```npm run dev```

## **Flow**

- User sends query → /api/chat
- Redis stores user + bot messages (with timestamps)
- RAG pipeline retrieves relevant news embeddings
- Gemini API generates answer
- Frontend streams response
- Persist chat history to Postgres

## **Caching & Performance**

- Redis TTL (Time-To-Live)
- Each session’s chat history is stored in Redis for fast retrieval.
- The TTL determines how long a session stays in memory before expiring.
- Configured via the .env variable:

```
    SESSION_TTL=3600  # in seconds, default 1 hour
```

- In redisClient.ts:
``` 
    const ttl = Number(process.env.SESSION_TTL || 3600);
    await redis.expire(key, ttl); 
```

- Behavior: If a user is inactive for longer than SESSION_TTL, their session in Redis will be automatically removed. Persistent transcripts remain in Postgres.
