import express from 'express';
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

export default router;