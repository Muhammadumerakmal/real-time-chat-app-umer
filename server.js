import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();

// serve static files
app.use(express.static("public"));

// create http server
const httpServer = createServer(app);

// attach socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// socket connection
io.on("connection", (socket) => {
  console.log("✅ user connected", socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ user disconnected", socket.id);
  });
});

// IMPORTANT
httpServer.listen(3000, () => {
  console.log("server running on port 3000 🔌");
});

