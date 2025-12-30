import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

app.get("/", (req, res) => {
  res.json({ status: "Backend running on Vercel" });
});

export default app;   // 🔥 IMPORTANT
