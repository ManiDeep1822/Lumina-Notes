require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const notesRoutes = require("./routes/notes.route");

const app = express();

/* Middleware */
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  }),
);

/* Routes */
app.use("/api", notesRoutes);

/* Health Check (Important for Render) */
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
