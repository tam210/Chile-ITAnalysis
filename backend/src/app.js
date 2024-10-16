// src/app.js
const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
const routes = require('./routes');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');  // Importa el middleware de errores

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Definir rutas
app.use('/api', routes);

// Middleware de manejo de errores (después de las rutas)
app.use(errorHandler);

// Puerto y servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});

