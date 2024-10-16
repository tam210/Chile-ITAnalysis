// src/db.js
const mongoose = require('mongoose');
const logger = require('./utils/logger');

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado a MongoDB');
  } catch (err) {
    logger.error('Error de conexión a MongoDB:', err);
    process.exit(1);  // Cerrar el servidor si la conexión falla
  }
};

module.exports = connectDB;
