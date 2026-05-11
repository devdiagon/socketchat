// Iniciar servidor de Socket
const socket = io();

 const send = document.querySelector('#send-message');
 const allMessages = document.querySelector('#all-messages');

 send.addEventListener('click', () => {
  // Capturar el valor del mensaje escrito
  const message = document.querySelector('#message').value;

  // Emitir un evento llamado "message" con el contenido de la variable message
  socket.emit("message", message);
 });

 socket.on('message', ({ user, message }) => {
  const msg = document.createRange().createContextualFragment(`
    <div class="message">
      <div class="image-container">
        <img src="/img/seal.png" alt="" />
      </div>
      <div class="message-body">
        <div class="user-info">
          <span class="username">${user}</span>
          <span class="time">10:30 AM</span>
          <p>
            ${message}
          </p>
        </div>
      </div>
    </div>
    `);
    allMessages.append(msg);
 });