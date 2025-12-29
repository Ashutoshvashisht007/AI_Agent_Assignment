
# AI Chat Application

A full-stack AI chat application with **persistent conversation history, multi-session handling, and a refined user experience.**
The app supports **guest users, conversation switching, dark/light mode, and smooth UI interactions.**

### Features Overview

* Chat with an AI model (LLM-powered)
* Persistent conversation history
* Multiple conversations per user
* Guest user support without authentication
* Dark / Light mode toggle
* Auto-scrolling chat window
* Animated sidebar (using motion)
* Responsive layout (mobile + desktop)
* Graceful error handling and loading states

### Tech Stack
* React.js
* TailwindCSS
* Motion
* Node.js
* Express.js
* PostgreSQL

### How to Run Locally (Step by Step)
#### Prerequisites
* Node.js (v18+ recommended)
* PostgreSQL
* npm or pnpm
####  1. Clone the repository
    git clone https://github.com/Ashutoshvashisht007/AI_Agent_Assignment.git

    cd Ai_Agent_Assignment

#### 2. Backend setup
    cd backend
    npm install

#### 3. Database setup
    The database is PostgreSQL.

    For this assignment, the database was created and managed manually:

    - PostgreSQL instance was created on Render.
    - Tables were created by running SQL queries directly using pgAdmin.
    - No migration or seed scripts are included in the repo.

#### 4. Backend environment variables
    Create a .env file inside server/:

    PORT=5000
    POSTGRES_URL=postgresql://username:password@localhost:5432/ai_chat_app
    GEMINI_API_KEY=your_api_key_here

#### 5. Tables
  * users
  * Conversations
  * messages
    
#### 6. Start the backend: 
    npm run dev
    
    Backend will run on http://localhost:5000.

#### 7. Frontend setup
    cd ../frontend
    npm install


#### 8. Create .env inside fronted/:

    API_BASE=http://localhost:5000


#### 9. Run frontend:

    npm run dev

    Frontend will be available at http://localhost:5173.

### User & Session Handling (Important Design Detail)

* The app supports guest users without authentication
* On first load, a guestUserId is generated using crypto.randomUUID() and stored in localStorage
* This ID is: 
    
    - Unique per browser
    - Shared across tabs of the same browser
    - Different across different browsers or devices

* Session handling
    - Each chat creates a conversation session
    - sessionId is stored in localStorage

* Messages are always linked to:
    - guestUserId
    - sessionId
    - This ensures:
      - Chat history persists on refresh
      - Conversations are isolated per browser
      - Users can switch between past conversations

### Chat History & Persistence

* Messages are stored in the database
* Conversation list is fetched using guestUserId
* Selecting a conversation loads its full message history
* History loading has a dedicated loading state
* Sidebar updates automatically when a new chat is created

### Frontend Architecture
#### Key concepts
##### useChat hook
* Centralizes all chat logic
* Handles message sending, loading history, errors, sessions
* Keeps UI components clean and focused

##### Component separation
* Layout: Sidebar, Header
* Chat: MessageList, ChatInput, LandingScreen, MessageItem
* UI: InlineError, ThemeToggle

#### UX enhancements

* Auto-scroll to latest message
* Animated sidebar (motion)
* Smooth transitions
* Skeleton loaders for conversations
* Optimistic UI updates for messages

### Backend Architecture
#### Structure
##### Routes layer
* /chat/send
* /chat/history
* /chat/conversations

##### Controller layer
* Request validation
* Response shaping

##### Service layer
* LLM interaction
* Business logic

##### Data layer
* PostgreSQL
* SQL migrations

### Design decisions
* Stateless API
* Session handled explicitly via sessionId
* No server-side sessions or cookies
* Clean separation between chat logic and persistence

### LLM Notes
#### Provider
* Uses Gemini

#### Prompting strategy
* System prompt defines assistant behavior
* User messages are appended sequentially
* Conversation context is preserved per session

### Trade-offs

* Full conversation context is sent for simplicity
* Token optimization not implemented due to assignment scope

### UI & UX Details
* Dark / Light mode support
* Auto-scroll on new messages
* Sidebar animation using motion
* Mobile-friendly sidebar overlay
* Inline error banners instead of blocking alerts
* Clear loading indicators for AI responses and history fetch

### Trade-offs & Future Improvements

#### If I had more time, I would:
* Add proper authentication (Google / email login)
* Allow cross-device conversation sync
* Add message streaming (token-by-token)
* Add conversation renaming and deletion
* Implement pagination for long chat histories
* Improve prompt token efficiency
* Add retry logic
* Add tests (unit + integration)

### Final Notes

#### This project prioritizes:

* Clear architecture
* Predictable data flow
* User-friendly UX
* Maintainable code

Performance optimizations and memoization were intentionally avoided until real bottlenecks are identified via profiling.