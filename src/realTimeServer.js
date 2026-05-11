module.exports = (httpServer) => {
  const { Server } = require('socket.io');
  const io = new Server(httpServer);

  // Encender la contectividad del socket
  io.on('connection', (socket) => {
    // console.log(`ID: ${socket.id}`);

    // Llamar al evento 'message' y obtener sus parámetros (en este caso con la variable llamada message)
    socket.on('message', message => {
      // Obtener la cookie desde el socket
      const cookie = socket.request.headers.cookie;
      // Extraer el nombre de usuario de la cookie
      // la cookie tiene el valor de la forma "username=value"
      const user = cookie.split("=").pop();

      io.emit('message', {
        user,
        message,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      });
    });
  });
};