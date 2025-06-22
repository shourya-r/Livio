import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";

import { initializeSocket } from "./socket/socket.server.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

const __dirname = path.resolve();

initializeSocket(httpServer);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/matches", matchRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Catch all handler: send back React's index.html file for any non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

httpServer.listen(PORT, () => {
  console.log("Listening on port " + PORT);
  connectDB();
});
