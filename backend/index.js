const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
