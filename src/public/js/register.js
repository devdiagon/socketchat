const login = document.querySelector('#login');

login.addEventListener('click', (e) => {
  e.preventDefault();
  const user = document.querySelector('#username').value;

  if(user === '') {
    alert('Ingrese un nombre de usuario');
    return;
  }

  // Guardar en una cookie
  document.cookie = `username=${user}`;

  // Redirigir a otra pagina
  document.location.href = '/';
});