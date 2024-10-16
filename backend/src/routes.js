// src/routes.js

const express = require('express');
const jobController = require('./controllers/jobController');
const router = express.Router();


// Rutas para las ofertas de trabajo
router.get('/jobs', jobController.getJobs);
router.post('/jobs', jobController.createJob);

// Rutas para las ofertas de trabajo
router.get('/scrape', jobController.scrapeJobs);  // Ruta para iniciar el scraping
router.get('/scrape-tech-test', jobController.scrapeJobsTechTest);  // Ruta para iniciar el scraping


// Ruta de prueba para verificar que el servidor responde
router.get('/test', (req, res) => {
    res.send('Servidor funcionando correctamente');
  });

module.exports = router;
