const express = require("express");
const router = express.Router();

const {
  getSessions,
  startNewSession,
  getSessionHistory,
  askQuestion,
} = require("../controllers/chat.controller");

router.get("/chat/sessions", getSessions);
router.post("/chat/new-chat", startNewSession);
router.post("/chat/ask", askQuestion);
router.get("/chat/sessions/:sessionId", getSessionHistory);

module.exports = router;
