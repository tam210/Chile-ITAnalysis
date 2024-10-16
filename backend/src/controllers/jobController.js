// src/controllers/jobController.js
const Job = require('../models/jobModel');
const scrapeChiletrabajos = require('../scrapers/chiletrabajosScraper');


// Obtener todas las ofertas de trabajo
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();  // Obtener todos los trabajos
    res.status(200).json(jobs);     // Responder con los trabajos en formato JSON
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las ofertas de trabajo' });
  }
};

// Crear una nueva oferta de trabajo con validaciones
exports.createJob = async (req, res) => {
  const { title, company, location, technologies } = req.body;

  // Validaciones básicas
  if (!title || !company) {
    return res.status(400).json({ message: 'El título y la empresa son obligatorios' });
  }

  try {
    const newJob = new Job({ title, company, location, technologies });
    await newJob.save();  // Guardar en MongoDB
    res.status(201).json(newJob);  // Responder con el trabajo creado
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la oferta de trabajo' });
  }
};

exports.scrapeJobs = async (req, res) => {
  try {
    await scrapeChiletrabajos();  // Llama a la función de scraping
    res.status(200).json({ message: 'Scraping completado y trabajos guardados' });
  } catch (err) {
    res.status(500).json({ message: 'Error al realizar el scraping' });
  }
};

exports.scrapeJobs2 = async (req, res) => {
  res.status(200).json({ message: 'Scraping iniciado' });

};

