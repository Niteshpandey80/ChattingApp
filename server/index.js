import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/status", (req, res) => {
  res.send("Server is live");
});

await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
