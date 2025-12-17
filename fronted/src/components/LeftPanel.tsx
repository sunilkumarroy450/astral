import SessionList from "./SessionList";
import { useSearchParams } from "react-router-dom";

interface LeftPanelProps {
  isOpen: boolean;
  onNewChat: () => void;
  sessionId: string | null;
  creatingChat?: boolean;
}

export default function LeftPanel({
  isOpen,
  onNewChat,
  sessionId,
  creatingChat = false,
}: LeftPanelProps) {
  const [searchParams] = useSearchParams();
  const currentSessionId = searchParams.get("session") || sessionId;

  return (
    <div
      className={`h-full flex flex-col transition-all duration-300 ${
        !isOpen ? "pointer-events-none" : ""
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0  dark:bg-gray-800/80 backdrop-blur-sm">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Chats
        </h2>
        <button
          onClick={onNewChat}
          disabled={creatingChat}
          className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${
            creatingChat
              ? "bg-blue-400 cursor-not-allowed text-blue-200"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {creatingChat ? (
            <>
              <svg
                className="w-4 h-4 mr-2 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Creating...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Chat
            </>
          )}
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-auto py-2 px-2">
        <SessionList sessionId={currentSessionId || ""} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 ">
        <button className="w-full text-xs text-white-500 dark:text-gray-400 hover:text-gray-700 transition-colors">
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}
