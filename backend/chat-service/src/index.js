import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Redis from "ioredis";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

// Redis connection
const redis = new Redis({
  host: process.env.REDIS_HOST || "redis-service",
  port: parseInt(process.env.REDIS_PORT) || 6379,
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("message", async (msg) => {
    console.log("Message received:", msg);
    await redis.rpush("messages", JSON.stringify(msg));
    io.emit("message", msg);
  });

  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

app.get("/", (req, res) => res.json({ service: "chat-service", status: "ok" }));

app.get("/history", async (req, res) => {
  const msgs = await redis.lrange("messages", 0, -1);
  res.json(msgs.map(m => JSON.parse(m)));
});

const PORT = process.env.PORT || 4002;
httpServer.listen(PORT, () => console.log(`🚀 Chat service listening on ${PORT}`));
