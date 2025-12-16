const express = require("express");
const router = express.Router();

const {
  getSessions,
  startNewSession,
} = require("../controllers/chat.controller");

router.get("/sessions", getSessions);
router.post("/sessions", startNewSession);

module.exports = router;
