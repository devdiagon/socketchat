// Función para obtener el usuario actual de la cookie desde el socket
export const getUserFromSocket = (socket: any): string => {
  // Obtener la cookie desde el socket
  const cookie = socket?.request?.headers?.cookie;
  // Extraer el nombre de usuario de la cookie
  // la cookie tiene el valor de la forma "username=value"
  return cookie ? String(cookie).split("=").pop() as string : 'Anónimo';
};