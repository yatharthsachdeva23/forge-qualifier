# Project: Collaborative Kanban Board (V2)

A premium, decoupled Kanban board application featuring a React (Vite) frontend and a Laravel (SQLite) backend API. Built with Tailwind CSS and `@hello-pangea/dnd`, this application implements an **API-First with Graceful Mock Fallback** architecture, support for optimistic updates, and automatic state rollback upon sync failures.

---

## 🔗 Live Production URLs
*   **Frontend (Vercel):** [https://forge-qualifier.vercel.app](https://forge-qualifier.vercel.app)
*   **Backend API (Railway):** [https://forge-qualifier-production.up.railway.app/api/board](https://forge-qualifier-production.up.railway.app/api/board)

---

## 🛠️ Local Run Instructions

### Prerequisites
Ensure you have **PHP (v8.2+)** and **Node.js (v18+)** installed.

### 1. Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Initialize local environment variables:
   ```bash
   cp .env.example .env
   ```
3. Generate application key:
   ```bash
   php artisan key:generate
   ```
4. Run migrations and database seeders to populate initial columns and 4 sample cards:
   ```bash
   php artisan migrate --seed
   ```
5. Start the local development server:
   ```bash
   php artisan serve
   ```
   *(Server will run at: `http://localhost:8000`)*

### 2. Frontend SPA Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (ignoring peer-deps conflicts due to React 19):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(Dev server will run at: `http://localhost:5173`)*

---

## 💡 Architecture & Key Features

### 🔄 API-First with Graceful Fallback
The frontend API service layer (`src/services/api.js`) initially attempts to fetch board data from the Laravel backend. If the backend is offline, unreachable, or times out, the service logs `Backend unreachable. Switching to mock data mode.` in the browser console and seamlessly loads default columns and tasks from `mockData.json` so the board is never empty.

### ⚡ Optimistic Updates & Rollback
When you drag and drop cards or submit a new card:
1. The UI instantly updates the card position and reorders them locally at the exact drop index using a precision splice algorithm.
2. An asynchronous `PATCH`/`POST` sync call is made to the backend database.
3. If the network call fails, the UI captures the error and automatically restores the card to its original position using a pre-action state snapshot, ensuring zero visual lag and data consistency.

### 🎨 Visual Indicators
*   **Dynamic Tag Styling:** Tags are mapped to theme colors (Bug $\rightarrow$ Red, Design $\rightarrow$ Blue, Feature $\rightarrow$ Green, Other $\rightarrow$ Gray).
*   **Overdue Warning Badges:** Automatically warns the user if a card's due date is in the past, except if the card resides in the **Done** column.
*   **DiceBear Avatars:** Unique member avatars generated dynamically based on `member_id`.

---

## 🔒 Security Config Redaction
Following the hackathon security guidelines, all active tokens (Slack Bot/App tokens, AI model keys) have been completely redacted from the committed configuration files inside `/config` and replaced with secure placeholders (`YOUR_SLACK_BOT_TOKEN`, `YOUR_MODEL_API_KEY`).
