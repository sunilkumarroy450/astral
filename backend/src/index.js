const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat.route");

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
