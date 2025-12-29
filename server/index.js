import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRoter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cors());

export const io = new Server(server , {
  cors:{origin:"*"}
})
export const userSocketMap ={} ;
io.on("connection" , (socket)=>{
  const userId = socket.handshake.query.userId ; 
  console.log("User connected" , userId);
  if(userId) userSocketMap[userId] = socket.id ;
  io.emit("getOnlineUsers" , Object.keys(userSocketMap));
  socket.on("disconnect" , ()=>{
    console.log("User Disconnected" , userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))
  
  })
})

app.get("/api/status", (req, res) => {
  res.send("Server is live");
});
app.use("/api/auth" , userRouter);
app.use("/api/messages" , messageRoter)

await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
