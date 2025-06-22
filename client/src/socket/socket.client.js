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
    console.log(
      "Socket connected successfully with ID:",
      socket.id,
      "for user:",
      userId
    );
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  // Add listener for newMessage events at socket level for debugging
  socket.on("newMessage", (message) => {
    console.log("Socket received newMessage event:", message);
  });
};

// Returns the socket instance
export const getSocket = () => {
  return socket;
};

// Check if socket is connected and ready
export const isSocketReady = () => {
  const ready = socket && socket.connected;
  console.log(
    "Socket ready check:",
    ready,
    "socket:",
    !!socket,
    "connected:",
    socket?.connected
  );
  return ready;
};

// Disconnects the socket connection
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
