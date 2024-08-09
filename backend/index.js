// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import connectDB from "./config/database.js";
// import messageRoute from "./routes/mesageRoute.js";
// import userRoute from "./routes/userRoute.js";

// dotenv.config({});

// const app = express();

// const PORT = process.env.PORT || 5000;

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// const corsOption = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
// app.use(cors(corsOption));

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server running on ${PORT}`);
// });

// ------------------------------------------------------------------------------------------------------>

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/database.js";
import messageRoute from "./routes/mesageRoute.js";
import userRoute from "./routes/userRoute.js";
// import { app, server } from "./socket/socket.js";

dotenv.config({});

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Start server and database connection
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on ${PORT}`);
});
