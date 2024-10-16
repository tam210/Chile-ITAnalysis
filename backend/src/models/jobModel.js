// src/models/jobModel.js
const mongoose = require('mongoose');

// Definir el esquema de la oferta de trabajo
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Título es obligatorio
  },
  company: {
    type: String,
    required: false,  // Empresa es obligatoria
  },
  location: {
    type: String,
    required: true,  // Ubicación es obligatoria
  },
  // datePosted: {
  //   type: Date,
  //   required: true,  // Fecha de publicación es obligatoria
  // },
  description: {
    type: String,
    required: true,  // Descripción es obligatoria
  },
  technologies: {
    type: [String],  // Array de tecnologías
    default: [],     // Valor por defecto es un array vacío
  },
  // isRemote: {
  //   type: Boolean,
  //   default: false,  // Valor por defecto es false
  // }
});

// Crear y exportar el modelo de MongoDB
module.exports = mongoose.model('Job', jobSchema);
