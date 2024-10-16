// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Imprime el stack trace del error
    res.status(500).json({
      message: err.message || 'Ha ocurrido un error en el servidor',
    });
  };
  
module.exports = errorHandler;
  