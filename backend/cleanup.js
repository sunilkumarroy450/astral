const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "src/data/sessions.json");
const data = JSON.parse(fs.readFileSync(dataPath));

data.sessions = data.sessions.filter(
  (session) => session.messages && session.messages.length > 0
);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log("✅ Cleaned empty sessions!");
