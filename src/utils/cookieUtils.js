// Función para obtener el usuario actual de la cookie
export const getCurrentUser = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'username') {
      return value;
    }
  }
  return null;
};

export const getUserFromSocket = (socket) => {
  // Obtener la cookie desde el socket
  const cookie = socket.request.headers.cookie;
  // Extraer el nombre de usuario de la cookie
  // la cookie tiene el valor de la forma "username=value"
  return cookie ? cookie.split("=").pop() : 'Anónimo';
};