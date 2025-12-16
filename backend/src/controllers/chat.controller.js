const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/sessions.json");

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

//controllers

exports.getSessions = (req, res) => {
  const data = readData();
  res.json(data.sessions.map((s) => ({ id: s.id, title: s.title })));
};

exports.startNewSession = (req, res) => {
  const data = readData();
  const newSession = {
    id: `session-${Date.now()}`,
    title: "New Chat",
    messages: [],
  };

  data.sessions.push(newSession);
  writeData(data);
  res.json(newSession);
};
