const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chat.route");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", chatRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../../fronted/dist")));

// React router fallback (Node 22 SAFE)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../fronted/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
