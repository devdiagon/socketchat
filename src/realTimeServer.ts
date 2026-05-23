import { Server } from 'socket.io';
import { getUserFromSocket } from './utils/cookieUtils.js';
import type { Server as HttpServer } from 'http';

const realTimeServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer);

  // Encender la contectividad del socket
  io.on('connection', (socket: import('socket.io').Socket) => {
    // console.log(`ID: ${socket.id}`);

    // Llamar al evento 'message' y obtener sus parámetros (en este caso con la variable llamada message)
    socket.on('message', (message: string) => {
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
    
    // Llamar al evento 'typing' cuando esté escribiendo
    socket.on('typing', () => {
      const user = getUserFromSocket(socket);
      // Usar bradcast para solo enviar al resto menos al usuario actual
      socket.broadcast.emit('typing', { user });
    });

    // Llamar al evento 'stopTyping' cuando deje de escribir
    socket.on('stopTyping', () => {
      const user = getUserFromSocket(socket);
      // Usar bradcast para solo enviar al resto menos al usuario actual
      socket.broadcast.emit('stopTyping', { user });
    });
  });
};

export default realTimeServer;