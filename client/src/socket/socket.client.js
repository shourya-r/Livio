import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket = null;

// Initializes the socket connection with the server
export const initializeSocket = (userId) => {
  console.log("Initializing socket with userId:", userId);
  if (socket) {
    console.log("Disconnecting existing socket");
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      userId,
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected successfully with ID:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });
};

// Returns the socket instance
export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not initialized. Call initializeSocket first.");
  }
  return socket;
};

// Disconnects the socket connection
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
