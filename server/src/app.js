// src/app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const http = require('http'); // Necesario para crear el servidor HTTP
const { Server } = require('ws'); // Importa el servidor WebSocket

require('./db.js');

const app = express();
const server = http.createServer(app); // Crea el servidor HTTP usando Express
const wss = new Server({ server }); // Crea un servidor WebSocket basado en el servidor HTTP

app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Ajusta según sea necesario
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

// Configura WebSocket para manejar las conexiones
wss.on('connection', (ws) => {
  console.log('Cliente conectado a WebSocket');

  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado de WebSocket');
  });
});

// Error catching middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Exporta el servidor y WebSocket para usarlos en otros archivos
module.exports = { server, wss };
