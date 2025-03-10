import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config(); // Load environment variables

const app = express();
const server = createServer(app);

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Enable CORS for Express
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST"], 
    credentials: true,
  })
);

// ✅ Enable CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

connectToSocket(io); // Pass io instance to socketManager

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Set view engine for rendering EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Define Routes
app.use("/api/v1/users", userRoutes);

// Fix: Add Home Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running on port " + app.get("port"));
});

// MongoDB Connection & Server Start
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

    // Start server after DB is connected
    const PORT = process.env.PORT || 8000;
    app.set("port", PORT);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

start();
