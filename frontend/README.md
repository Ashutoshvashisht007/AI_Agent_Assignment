# RAG Chatbot - Frontend

This is the frontend of the RAG (Retrieval-Augmented Generation) chatbot application built with **React + TypeScript + SCSS**. It communicates with the backend API to fetch and display chat messages, handle user inputs, and stream AI responses.

---

## **Tech Stack**

- React 18 + TypeScript
- Vite
- SCSS
- Custom Hooks (useChat)
- Axios / Fetch API for backend communication

---

## **Features**

- Displays past chat messages from backend (Redis/Postgres)
- Input box for new messages
- Streaming or typed-out bot responses
- Reset session button
- Persist session button (save chat history to Postgres)
- Session management via localStorage

---

## **Environment Variables**

Create a `.env` file in the root of the frontend project:

```env
VITE_API_BASE=<YOUR_BACKEND_URL>/api
```

## **Setup & Run Locally**

Install dependencies:

```npm install```


Start development server:

```npm run dev```

## **Usage**

- Open the chat page
- Type your query and send
- See AI response streamed in real-time
- Optionally, persist session or reset session