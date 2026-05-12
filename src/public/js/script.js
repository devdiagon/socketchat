import { getCurrentUser } from '../../utils/cookieUtils.js';
import { escapeHTML } from '../../utils/stringUtils.js';

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

// Escuchar el evento "message" para mostrar los mensajes en pantalla
socket.on('message', ({ user, message, timestamp }) => {
  const currentUser = getCurrentUser();
  const isOtherUser = user !== currentUser;
  
  const msg = document.createRange().createContextualFragment(`
    <div class="message ${isOtherUser ? 'other-message' : 'own-message'}">
      <div class="image-container">
        <img src="/img/seal.png" alt="" />
      </div>
      <div class="message-body">
        <div class="user-info">
          <span class="username">${escapeHTML(user)}</span>
          <span class="time">${escapeHTML(String(timestamp))}</span>
          <p>
            ${escapeHTML(message)}
          </p>
        </div>
      </div>
    </div>
  `);
  allMessages.append(msg);
});


// Manejo del evento typing
let typingTimeout = null;

document.querySelector('#message').addEventListener('input', () => {
  // Emitir el evento de 'typing' (está escribiendo)
  socket.emit('typing');

  // Si ya había un timer corriendo, se reinicio
  clearTimeout(typingTimeout);

  // Si el usuario deja de escribir por 1.5s, se emite el stopTyping
  typingTimeout = setTimeout(() => {
    socket.emit('stopTyping');
  }, 1500);
});


// Construir elementos HTML de eventos de escritura
const typingUsers = new Set();
const typingIndicator = document.querySelector('#typing-indicator');

const updateTypingIndicator = () => {
  // Si nadie escribe no mostrar nada
  if (typingUsers.size === 0) {
    typingIndicator.textContent = '';
    // Detener la animación removiendo la clase
    typingIndicator.classList.remove('visible');
  } else {
    // Mostrar si uno o varios usuarios están escribiendo
    const names = [...typingUsers].join(', ');
    const verb = typingUsers.size === 1 ? 'está escribiendo' : 'están escribiendo';
    typingIndicator.textContent = `${names} ${verb}...`;
    // Activar la animación agregando la clase
    typingIndicator.classList.add('visible');
  }
};

// Escuchar eventos de 'typing'
socket.on('typing', ({ user }) => {
  typingUsers.add(user);
  updateTypingIndicator();
});

socket.on('stopTyping', ({ user }) => {
  typingUsers.delete(user);
  updateTypingIndicator();
});