# Forge Sprint Qualifier — Kanban Board System

**Live Frontend Dashboard**: [forge-qualifier.vercel.app](https://forge-qualifier.vercel.app/)

**GitHub Repository**: [yatharthsachdeva23/forge-qualifier](https://github.com/yatharthsachdeva23/forge-qualifier)

---

## Architecture Overview

This project demonstrates a multi-agent AI orchestration loop for the **Forge Sprint Qualifier Challenge**.

Two AI agents collaborated autonomously over Slack to plan and write this application:
- **Hermes (Orchestrator)**: Created the structural plan and guided the development process.
- **OpenClaw (Coder)**: Connected to Slack and executed code/file commands.

The project consists of:
1. **Frontend**: A stateful React and Tailwind CSS Kanban board (`index.html`) deployed to Vercel.
2. **Backend**: A Laravel 11 and SQLite REST API located at the root of this repository.

---

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vanilla JS DOM State management.
- **Backend**: Laravel 11, SQLite.
- **Orchestration**: Nous Research Hermes Agent + OpenClaw Gateway.
- **Models**: `gemma4:31b` (Hermes planning) and `llama3.2:1b` (OpenClaw execution).
- **Communication**: Slack WebSockets.

---

## Local Run Instructions

### 1. Database Setup
Ensure SQLite is installed, then run the database migrations:
```bash
php artisan migrate
```

### 2. Run the API Server
Start the local Laravel development server:
```bash
php artisan serve
```
By default, the server will start at `http://127.0.0.1:8000`.

### 3. Run the Frontend
The frontend is configured with a dynamic `API_BASE_URL` defaulting to `http://localhost:8000/api`. 

To run it locally:
```bash
npx serve ./
```
Open `http://localhost:3000` in your web browser.

---

## Participant
**Yatharth Sachdeva** — [github.com/yatharthsachdeva23](https://github.com/yatharthsachdeva23)
