// src/scrapers/chiletrabajosScraper.js
const puppeteer = require('puppeteer');

const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

async function extractTechnologiesAndType(description) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",  // Asegúrate de usar el modelo que desees
      messages: [{ role: "user", content: `Extrae las tecnologías y el tipo de trabajo de la siguiente descripción: "${description}". Procura solo responder con las tecnologías listadas con comas y el tipo de trabajo (remoto/híbrido/presencial), ambos separados por un salto de linea /n` }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Reemplaza con tu clave API
        'Content-Type': 'application/json'
      }
    });

    const { choices } = response.data;
    const result = choices[0].message.content;  // Obtener respuesta de la IA
    console.log("Respuesta IA: ",result)
    const [technologies, jobType] = result.split('\n').map(item => item.trim()); // Ajusta según la estructura de la respuesta
    return { technologies: technologies.split(', '), jobType }; // Devuelve tecnologías y tipo
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    return { technologies: [], jobType: '' };  // En caso de error, devuelve valores vacíos
  }
}

async function scrapeTechTest() {
  console.log("INICIANDO SCRAPING - IA")

    desc = `XXXXXXXXXX En BC Tecnología estamos en la búsqueda de un Especialista en DataOps para unirse a nuestro equipo. Buscamos un profesional con sólidas habilidades técnicas en AWS, manejo de bases de datos, automatización y herramientas de calidad de datos.
  
  Requisitos:
  • Experiencia mínima de 3 años en roles relacionados con DataOps.
  • Dominio de AWS (S3, Lambda, Redshift, Datalake).
  • Conocimientos sólidos en ELK Elasticsearch para análisis de datos.
  • Experiencia en sistemas operativos Linux y Unix.
  • Dominio de Python, PySpark y SQL.
  • Conocimientos avanzados en CI/CD (Terraform, GitLab, Jenkins).
  • Experiencia en modelos de datos relacionales y dimensionales.
  
  Deseables
  • Conocimiento en Retail (no excluyente, pero altamente valorado).
  
  Ofrecemos
  • Contrato 3 meses y según desempeño Indefinido
  • Horario de lunes a Viernes 8:30 a 18:30
  • Modalidad de trabajo: Hibrido
  • Beneficios
  Si cumples con el perfil Enviar CV mencionando con experiencia a: pcares@bctecnologia.com Indicando pretensiones de renta y me pondré en contacto contigo a la brevedad si cumples con el perfil solicitado.`
    
  console.log(desc);
  const { technologies, jobType } = await extractTechnologiesAndType(desc);  
  
  // console.log(technologies, jobType)
  
  }

module.exports = scrapeTechTest;

  