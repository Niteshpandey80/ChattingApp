import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import { initSocket } from "./lib/socket.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();
const server = http.createServer(app);

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ================= ROUTES ================= */
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

/* ================= START SERVER ================= */
const startServer = async () => {
  try {
    await connectDB();
    initSocket(server);

    // Pick port from env or default 5000
    const DEFAULT_PORT = 5000;
    let PORT = process.env.PORT || DEFAULT_PORT;

    // Check if port is in use (optional)
    const isPortFree = await new Promise((resolve) => {
      server.once("error", (err) => {
        if (err.code === "EADDRINUSE") resolve(false);
        else resolve(true);
      });
      server.once("listening", () => resolve(true));
      server.listen(PORT);
    });

    if (!isPortFree) {
      console.warn(`⚠️ Port ${PORT} in use, switching to ${DEFAULT_PORT + 1}`);
      PORT = DEFAULT_PORT + 1;
      server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    } else {
      console.log(`🚀 Server running on port ${PORT}`);
    }
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
