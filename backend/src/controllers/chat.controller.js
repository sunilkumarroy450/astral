const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/sessions.json");

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Controllers
exports.getSessions = (req, res) => {
  const data = readData();
  res.json({ sessions: data.sessions });
};

exports.startNewSession = (req, res) => {
  const data = readData();
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
  const data = readData();
  const sessionIndex = data.sessions.findIndex((s) => s.id === sessionId);

  if (sessionIndex === -1) {
    return res.status(404).json({ error: "Session not found" });
  }

  const mockResponse =
    MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

  // Add user message
  const userMessage = {
    role: "user",
    content: question,
    timestamp: new Date().toISOString(),
  };

  // Add assistant message
  const assistantMessage = {
    role: "assistant",
    content: "Here's your detailed analysis:",
    data: mockResponse,
    timestamp: new Date().toISOString(),
  };

  data.sessions[sessionIndex].messages.push(userMessage, assistantMessage);

  // Update title based on first question
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
