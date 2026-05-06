module.exports = (httpServer) => {
  const { Server } = require('socket.io');
  const io = new Server(httpServer);

  // Encender la contectividad del socket
  io.on('connection', (socket) => {
    console.log(`ID: ${socket.id}`);
  });
};