import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const views = path.join(__dirname, '..', 'views');

// Verificar si el usuario está loggeado con un middleware
router.get('/', isLoggedIn , (req, res) => {
  res.sendFile(views + '/index.html');
});

router.get('/register', (req, res) => {
  res.sendFile(views + '/register.html');
});

/**
 * @route GET /io-test
 * @description Endpoint para demostrar la concurrencia de I/O.
 * Lee un archivo de forma asíncrona sin bloquear el Event Loop.
 */
router.get('/io-test', (req, res) => {
 // Obtenemos la ruta absoluta al package.json
 const filePath = path.join(__dirname, '..', '..', 'package.json');
 // fs.readFile es una operación de I/O asíncrona.
 // Node.js delega la lectura al sistema operativo y el callback
 // se encolará en la Macrotask Queue cuando la lectura termine.
 // Mientras tanto, el Event Loop sigue libre para atender otras peticiones.
 fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return res.status(500).send('Error al leer el archivo.');
  }
  res.type('json').send(data);
 });
});

export default router;