import { Server } from "socket.io";

let io;

// store the userId and socket id mapping
const connectedUsers = new Map();

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  // Middleware to authenticate user based on socket handshake
  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    console.log("Socket auth attempt with userId:", userId);
    if (!userId) {
      return next(new Error("User ID is required"));
    }
    socket.userId = userId; // Store userId in the socket object
    next();
  });

  io.on("connect", (socket) => {
    console.log(
      `User connected with socket id: ${socket.id}, userId: ${
        socket.userId
      } (type: ${typeof socket.userId})`
    );
    // Ensure userId is stored as string for consistent lookups
    const userIdString = socket.userId.toString();
    connectedUsers.set(userIdString, socket.id);
    console.log("Connected users map:", Array.from(connectedUsers.entries()));

    socket.on("disconnect", () => {
      console.log(
        `User disconnected with socket id: ${socket.id}, userId: ${socket.userId}`
      );
      connectedUsers.delete(userIdString);
      console.log(
        "Connected users map after disconnect:",
        Array.from(connectedUsers.entries())
      );
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io is not initialized.");
  return io;
};

export const getConnectedUsers = () => {
  return connectedUsers;
};
