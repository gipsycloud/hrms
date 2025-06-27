import { Server } from 'socket.io';
import redis from 'redis';

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST"],
      credentials: false
    },
    allowEIO3: true // Enable support for older clients
  });

  //socket.io connection
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id);
    socket.on('join', (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} disconnected`);
    });
    socket.emit('notification', {
      message: 'Welcome to the notification service!'
    });

    socket.on('disconnect', () => {
    // Remove user from connectedUsers
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId)
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
  });
  return io;
}

// export const getConnectedUsers = () => connectedUsers;