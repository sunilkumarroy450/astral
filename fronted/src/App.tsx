import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import LeftPanel from "./components/LeftPanel";
import ChatPanel from "./components/ChatPanel";
import { useChat } from "./hooks/useChat";

function AppContent() {
  const [isDark, setIsDark] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [creatingChat, setCreatingChat] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session") || "";

  const { startNewChat } = useChat(sessionId);

  // Theme effect
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  const handleNewChat = async () => {
    if (creatingChat) return;

    setCreatingChat(true);
    try {
      const newSessionId = await startNewChat();
      if (newSessionId) {
        setSearchParams({ session: newSessionId });
        navigate(`/?session=${newSessionId}`);
      }
    } finally {
      setCreatingChat(false);
    }
  };

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const toggleTheme = () => {
    console.log("🖱️ Theme toggle clicked!");
    setIsDark((prev) => {
      const newValue = !prev;
      return newValue;
    });
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePanel}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Assistant
          </h1>
        </div>

        {/* THEME BUTTON */}
        <button
          onClick={toggleTheme}
          className="bg-red-200 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
          style={{ minWidth: "120px" }}
        >
          {isDark ? "🌙 DARK" : "☀️ LIGHT"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div
          className={`lg:w-80 ${
            isPanelOpen ? "w-64" : "w-0"
          } transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
        >
          <LeftPanel
            isOpen={isPanelOpen}
            onNewChat={handleNewChat}
            sessionId={sessionId}
            creatingChat={creatingChat}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
