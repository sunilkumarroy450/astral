## ✨ **Live Demo**
# ChatGPT-Style Chat Application

A full-stack ChatGPT clone built with **React**, **TypeScript**, **TailwindCSS**, and **Node.js (Express)**. Features session management, tabular responses, feedback system, and dark/light themes.

## 🌐 Live Demo

**[https://astral-4.onrender.com/](https://astral-4.onrender.com/)**

> Click the link above to use the deployed app instantly. No setup required!

## ✨ Features

- ✅ **Landing Page** with "New Chat" screen
- ✅ **Collapsible Left Sidebar** showing all sessions
- ✅ **Session Management** with URL-based session IDs
- ✅ **Chat Interface** with tabular data responses
- ✅ **Like/Dislike Feedback** for each answer
- ✅ **Dark/Light Theme Toggle**
- ✅ **Responsive Design** (Mobile + Desktop)
- ✅ **Mock Backend APIs** (no database needed)

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React | Node.js |
| TypeScript | Express |
| TailwindCSS | TypeScript |
| React Router | CORS |


## 🚀 Quick Start (Local)

### 1. Clone Repository
git clone <YOUR_REPO_URL>.git
cd <PROJECT_NAME>


### 2. Backend Setup
cd backend
npm install
npm run dev

**Backend runs on:** `http://localhost:8080`

### 3. Frontend Setup
cd fronted
npm install
npm run dev

**Frontend runs on:** `http://localhost:3000`

## 📖 How to Use

### 1. **Start New Chat**
- Open app → Click **"New Chat"** button
- Redirects to `/chat/session-1` (unique session ID)

### 2. **Send Questions**
- Type question in input box
- Press **Enter** or click **Send** (➤)
- Get **description + table response**

### 3. **Session Management**
- **Left Sidebar** lists all sessions
- Click any session to load its history
- Sidebar collapses on mobile


### 4. **Theme Toggle**
- Top-right **☀️/🌙** button switches themes
- Affects entire app (backgrounds, text, tables)

