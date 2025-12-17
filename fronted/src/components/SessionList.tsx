import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import type { Session } from "../types";

interface SessionListProps {
  sessionId: string | null;
}

export default function SessionList({ sessionId }: SessionListProps) {
  const navigate = useNavigate();
  const { sessions, loadSession } = useChat(sessionId || undefined);

  const handleSessionClick = (clickedSessionId: string) => {
    loadSession(clickedSessionId);
    navigate(`/?session=${clickedSessionId}`);
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No chats yet. Start a new chat!
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sessions.map((session: Session) => (
        <button
          key={session.id}
          onClick={() => handleSessionClick(session.id)}
          className={`w-full flex items-center p-3 text-left rounded-lg transition-colors group ${
            sessionId === session.id
              ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          <div className="flex-1 min-w-0 truncate">
            <p className="font-medium truncate">{session.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {new Date(session.createdAt).toLocaleDateString()}
            </p>
          </div>
          {session.messages.length > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {session.messages.length / 2}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
