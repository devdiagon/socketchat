const express = require('express');
const { createServer } = require('http');
const realTimeServer = require('./realTimeServer');
const path = require('path');
const cookieParser = require('cookie-parser');

// Se crea una aplicación de express
const app = express();
// Se crea un servidor para poder realizar peticiones HTTP
const httpServer = createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Despues de entrar en una vista leer las cookies (parseo)
app.use(cookieParser());
// Especificar las rutas disponibles
app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'public')));

httpServer.listen(app.get('port'), () => {
  console.log(`La aplicación está corriendo en el puerto ${app.get('port')}`);
});

// Desupés de haber iniciado la aplicación en express
realTimeServer(httpServer);