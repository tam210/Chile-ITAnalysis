// src/scrapers/chiletrabajosScraper.js
const puppeteer = require('puppeteer');
const Job = require('../models/jobModel');  // Modelo para guardar en MongoDB

async function scrapeChiletrabajos(maxJobs = 30) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let jobs = [];
  let currentPage = 1;

  while (jobs.length < maxJobs) {
    const url = `https://www.chiletrabajos.cl/trabajos/informatica/${(currentPage - 1) * 30}`;
    console.log(`Navegando a: ${url}`);  // Verifica la URL que se está accediendoa
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Obtener los enlaces a las ofertas de trabajo
    const jobLinks = await page.evaluate(() => {
      const links = [];
      const jobElements = document.querySelectorAll('.job-item.with-thumb .title a');  // Selector para enlaces de ofertas
      jobElements.forEach(job => links.push(job.href));  // Extraer URL de la oferta
      return links;
    });

    console.log(`Se encontraron ${jobLinks.length} enlaces de trabajos.`);  // Verifica cuántos enlaces se encontraron

    // Recorrer los enlaces para obtener información de cada oferta
    for (const link of jobLinks) {
      await page.goto(link, { waitUntil: 'networkidle2' });

      const jobDetails = await page.evaluate(() => {
        const title = document.querySelector('.title.titulo-detalle').innerText;  // Título
        // const company = document.querySelector('.oferta-estrella').previousElementSibling.innerText; // Nombre de la empresa
        // const location = document.querySelector('td:nth-child(2) a').innerText;  // Ubicación
        // const datePosted = document.querySelector('td:nth-child(2) div').innerText; // Fecha
        const company = "por defecto";
        const location = "por defecto";
        const description = document.querySelector('.mb-0').innerText;  // Descripción
        const technologies = [];  // Puedes definir cómo extraer tecnologías específicas si se listan
        const benefits = [];  // Aquí podrías extraer beneficios si están presentes

        // Extracción de beneficios
        // const benefitElements = document.querySelectorAll('.icon-beneficio[data-original-title]');
        // benefitElements.forEach(benefit => {
        //   benefits.push(benefit.getAttribute('data-original-title'));
        // });
        console.log(title)

        return {
          title,
          company,
          location,
          // datePosted,
          description,
          technologies
          // isRemote: location.includes('Remoto') || location.includes('Híbrido'),  // Determina si es remoto
        };
      });

      jobs.push(jobDetails);

      // Si ya tienes 5000 trabajos, salir del bucle
      if (jobs.length >= maxJobs) {
        break;
      }
    }

    console.log(`Página ${currentPage}: Se obtuvieron ${jobs.length} trabajos.`);
    currentPage++;  // Pasar a la siguiente página
  }

  // Guardar en MongoDB
  for (const job of jobs) {
    const newJob = new Job(job);
    await newJob.save();
  }

  console.log(`Se guardaron ${jobs.length} trabajos en la base de datos.`);
  await browser.close();
}

async function scrapeChiletrabajos2(maxJobs = 30){
  job1 = {
    title : 'Titulo',
          company : 'Compañia',
          location: 'Localidad',
          // datePosted,
          description: 'desc',
          technologies: ['python','c++'],
          benefits: ['remoto', 'informal'],
          isRemote: true
        
  }
  console.log(job1)
  const jobN = new Job(job1);
  await jobN.save();
}
module.exports = scrapeChiletrabajos;
