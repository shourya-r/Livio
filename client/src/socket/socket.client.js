import io from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

let socket = null;

// Initializes the socket connection with the server
export const initializeSocket = (userId) => {
  console.log("=== INITIALIZING SOCKET ===");
  console.log("Socket URL:", SOCKET_URL);
  console.log("User ID:", userId);
  console.log("Environment:", import.meta.env.MODE);
  
  if (socket) {
    console.log("Disconnecting existing socket");
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: {
      userId,
    },
    transports: ['websocket', 'polling'],
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
    console.error("Error details:", {
      message: error.message,
      description: error.description,
      context: error.context,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  // Add listener for newMessage events at socket level for debugging
  socket.on("newMessage", (message) => {
    console.log("=== SOCKET RECEIVED NEW MESSAGE ===");
    console.log("Message:", message);
    console.log("Message ID:", message._id);
    console.log("Sender:", message.sender);
    console.log("Receiver:", message.receiver);
    console.log("Content:", message.content);
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
