const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/sessions.json");
const { MOCK_RESPONSES } = require("../utils/index");

// ✅ AUTO-CREATE if missing (CRITICAL FOR RENDER)
const readData = () => {
  if (!fs.existsSync(dataPath)) {
    // ✅ Create empty sessions on first run
    const initialData = { sessions: [] };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
    console.log("✅ Created initial sessions.json");
  }
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Controllers
exports.getSessions = (req, res) => {
  const data = readData();
  res.json({ sessions: data.sessions });
};

exports.startNewSession = (req, res) => {
  const data = readData();

  // ✅ Check if recent empty session exists (last 5s)
  const now = Date.now();
  const recentEmpty = data.sessions.find(
    (s) =>
      s.title === "New Chat" &&
      now - Date.parse(s.createdAt) < 5000 &&
      (!s.messages || s.messages.length === 0)
  );

  if (recentEmpty) {
    // Return existing recent empty session
    return res.json({ sessionId: recentEmpty.id });
  }

  // Create NEW session only if no recent empty
  const newSessionId = `session-${Date.now()}`;
  const newSession = {
    id: newSessionId,
    title: "New Chat",
    createdAt: new Date().toISOString(),
    messages: [],
  };

  data.sessions.push(newSession);
  writeData(data);
  res.json({ sessionId: newSessionId });
};

exports.getSessionHistory = (req, res) => {
  const data = readData();
  const session = data.sessions.find((s) => s.id === req.params.sessionId);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  res.json({ session });
};

exports.askQuestion = (req, res) => {
  const { sessionId, question } = req.body;

  if (!sessionId || !question) {
    return res.status(400).json({ error: "sessionId and question required" });
  }

  const data = readData();
  const sessionIndex = data.sessions.findIndex((s) => s.id === sessionId);

  if (sessionIndex === -1) {
    return res.status(404).json({ error: "Session not found" });
  }

  // ✅ SAFETY: Initialize messages array if undefined
  if (!data.sessions[sessionIndex].messages) {
    data.sessions[sessionIndex].messages = [];
  }

  const mockResponse =
    MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

  const userMessage = {
    role: "user",
    content: question,
    timestamp: new Date().toISOString(),
  };

  const assistantMessage = {
    role: "assistant",
    content: "Here's your detailed analysis:",
    data: mockResponse,
    timestamp: new Date().toISOString(),
  };

  data.sessions[sessionIndex].messages.push(userMessage, assistantMessage);

  // ✅ SAFETY: Check length safely
  if (data.sessions[sessionIndex].messages.length === 2) {
    data.sessions[sessionIndex].title =
      question.substring(0, 50) + (question.length > 50 ? "..." : "");
  }

  writeData(data);

  res.json({
    message: assistantMessage,
    session: data.sessions[sessionIndex],
  });
};
