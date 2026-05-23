const login = document.querySelector('#login');

login.addEventListener('click', (e) => {
  e.preventDefault();
  const username = document.querySelector('#username').value;

  if(username === '') {
    alert('Ingrese un nombre de usuario');
    return;
  }

  // Guardar en una cookie
  document.cookie = `username=${username}`;

  // Redirigir a otra pagina
  document.location.href = '/';
});