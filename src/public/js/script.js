// Iniciar servidor de Socket
const socket = io();

const send = document.querySelector('#send-message');
const allMessages = document.querySelector('#all-messages');

// En caso de presionar enter enviar mensaje
document.querySelector('#message').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // Lanzar el evento click del botón de envío de mensaje
    send.click();
  }
});

send.addEventListener('click', () => {
  // Capturar el valor del mensaje escrito
  const message = document.querySelector('#message').value;

  // No enviar si el mensaje está en blanco/vacio
  if (message.trim() === '') return;

  // Emitir un evento llamado "message" con el contenido de la variable message
  socket.emit("message", message);

  // Limpiar el input del mensaje
  document.querySelector('#message').value = '';

  // Hacer focus en el input del mensaje
  document.querySelector('#message').focus();
 });

//
socket.on('message', ({ user, message, timestamp }) => {
  const msg = document.createRange().createContextualFragment(`
    <div class="message">
      <div class="image-container">
        <img src="/img/seal.png" alt="" />
      </div>
      <div class="message-body">
        <div class="user-info">
          <span class="username">${user}</span>
          <span class="time">${timestamp}</span>
          <p>
            ${message}
          </p>
        </div>
      </div>
    </div>
  `);
  allMessages.append(msg);
});