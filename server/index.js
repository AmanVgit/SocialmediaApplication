import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from "./Routes/UploadRoute.js"
import ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();

const io = new Server(8800, {
  cors: {
    origin: "http://localhost:3000",
  }
});


dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());


// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));


app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Server is Live',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_DB);
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

// usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)


// *************Socket Connections************
let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
  });