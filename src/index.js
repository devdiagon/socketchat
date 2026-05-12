import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import realTimeServer from './realTimeServer.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Se crea una aplicación de express
const app = express();
// Se crea un servidor para poder realizar peticiones HTTP
const httpServer = createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Despues de entrar en una vista leer las cookies (parseo)
app.use(cookieParser());
// Especificar las rutas disponibles
app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));

httpServer.listen(app.get('port'), () => {
  console.log(`La aplicación está corriendo en el puerto ${app.get('port')}`);
});

// Desupés de haber iniciado la aplicación en express
realTimeServer(httpServer);