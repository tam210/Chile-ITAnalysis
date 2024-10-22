// src/controllers/jobController.js
const Job = require('../models/jobModel');
const extractTechnologiesAndType = require('../scrapers/techscrap');
const scrapeChiletrabajos = require('../scrapers/chiletrabajosScraper');


const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');


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

exports.scrapeJobsTest = async (req, res) => {
  res.status(200).json({ message: 'Scraping iniciado' });

};


exports.scrapeJobsTechTest = async (req, res) => {
  try {
    await extractTechnologiesAndType();  // Llama a la función de scraping
    res.status(200).json({ message: 'Tecnologias obtenidas con IA' });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tecnologias con IA' });
  }};

// exports.getTopTechs = async (req, res) => {
//     try {
//       await getTopTechsJSON(res); 
//       res.status(200).json({ message: 'Obteniendo tecnologías' });
//     } catch (err) {
//       res.status(500).json({ message: 'Error al obtener las tecnologías' });
//   }};
  

// Obtener las tecnologías del CSV y devolverlas como JSON
exports.getTopTechs = async (req, res) => {
  try {
    // Ruta al archivo CSV
    const csvFilePath = path.join(__dirname, '../spark/top_tecnologias_op_2.csv/part-00000-ac19a8e3-5d3f-4241-ba3e-2e9c94213367-c000.csv');
    console.log(csvFilePath)
    // Leer el archivo CSV
    fs.readFile(csvFilePath, 'utf8', (err, csvData) => {
      if (err) {
        return res.status(500).json({ error: 'Error al leer el archivo CSV' });
      }

      // Parsear el CSV a JSON usando PapaParse
      Papa.parse(csvData, {
        header: true,
        complete: function (results) {
          // Log para revisar el contenido procesado
          console.log("Datos procesados desde CSV:", results.data);
          
          const sortedData = results.data.sort((a, b) => b.count - a.count);  // Ordenar por la columna "Count"
          
          // Revisar si el resultado es un array vacío
          if (sortedData.length === 0) {
            return res.status(400).json({ message: 'CSV vacío o mal formateado' });
          }

          res.status(200).json(sortedData);  // Enviar los datos como JSON al frontend
        },
        error: function (error) {
          res.status(500).json({ error: 'Error al parsear el CSV' });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tecnologías' });
  }
};