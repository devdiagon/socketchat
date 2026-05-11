module.exports = (httpServer) => {
  const { Server } = require('socket.io');
  const io = new Server(httpServer);

  // Encender la contectividad del socket
  io.on('connection', (socket) => {
    // console.log(`ID: ${socket.id}`);

    // Llamar al evento 'message' y obtener sus parámetros (en este caso con la variable llamada message)
    socket.on('message', message => {
      io.emit('message', {
        user: 'Fredo',
        message,
      });
    });

  });
};