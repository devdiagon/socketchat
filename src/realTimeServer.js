import { Server } from 'socket.io';
import { getUserFromSocket } from './utils/cookieUtils.js';

const realTimeServer = (httpServer) => {
  const io = new Server(httpServer);

  // Encender la contectividad del socket
  io.on('connection', (socket) => {
    // console.log(`ID: ${socket.id}`);

    // Llamar al evento 'message' y obtener sus parámetros (en este caso con la variable llamada message)
    socket.on('message', message => {

      const user = getUserFromSocket(socket);

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

export default realTimeServer;