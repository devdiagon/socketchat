// Función para obtener el usuario actual de la cookie
export const getCurrentUser = () => {
  const cookies = typeof document !== 'undefined' ? document.cookie.split(';') : [];
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'username') {
      return value;
    }
  }
  return null;
};