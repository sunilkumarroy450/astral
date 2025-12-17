import { useState, useEffect, useCallback } from "react";
import type { Message, Session } from "../types";

export const useChat = (initialSessionId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "/api";

  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/chat/sessions`);
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    }
  }, []);

  const startNewChat = async () => {
    //  Check current session is empty "New Chat"
    if (currentSessionId && sessions.length > 0) {
      const currentSession = sessions.find((s) => s.id === currentSessionId);
      if (
        currentSession?.title === "New Chat" &&
        currentSession.messages.length === 0
      ) {
        
        return currentSessionId;
      }
    }

   
    const existingNewChat = sessions.find(
      (s) => s.title === "New Chat" && (!s.messages || s.messages.length === 0)
    );
    if (existingNewChat) {
      setCurrentSessionId(existingNewChat.id);
      setMessages([]);
      return existingNewChat.id;
    }

    //  Create NEW session only if needed
    try {
      const response = await fetch(`${API_BASE}/chat/new-chat`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.sessionId) {
        setCurrentSessionId(data.sessionId);
        setMessages([]);
        await fetchSessions();
        return data.sessionId;
      }
    } catch (error) {
      console.error("Failed to start new chat:", error);
    }
  };

  const sendMessage = async (question: string) => {
    if (!currentSessionId) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/chat/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentSessionId, question }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      const response = await fetch(`${API_BASE}/chat/sessions/${sessionId}`);
      const data = await response.json();
      if (data.session) {
        setCurrentSessionId(sessionId);
        setMessages(data.session.messages || []);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    }
  };

  const toggleFeedback = (messageIndex: number, type: "like" | "dislike") => {
    setMessages((prev) =>
      prev.map((msg: Message, i: number) => {
        if (i === messageIndex) {
          return {
            ...msg,
            liked: type === "like" ? !msg.liked : false,
            disliked: type === "dislike" ? !msg.disliked : false,
          };
        }
        return msg;
      })
    );
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (initialSessionId && initialSessionId !== currentSessionId) {
      setCurrentSessionId(initialSessionId);
      loadSession(initialSessionId);
    }
  }, [initialSessionId]);

  return {
    messages,
    sessions,
    currentSessionId,
    loading,
    startNewChat,
    sendMessage,
    loadSession,
    toggleFeedback,
    fetchSessions,
  };
};
