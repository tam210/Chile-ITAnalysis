// src/scrapers/chiletrabajosScraper.js

// Medir tiempo de scraping
const startScrapingTime = Date.now();


const puppeteer = require('puppeteer');
const Job = require('../models/jobModel');  // Modelo para guardar en MongoDB
// PREPROCESAMIENTO - Función para guardar en CSV los trabajos
const fs = require('fs');

function guardarEnCSV(jobs, filename) {
  const headers = ['title', 'location', 'type', 'description'].join(';') + '\n';
  const data = jobs.map(job => `${job.title};${job.location};${job.type};${job.description}`).join('\n');
  
  fs.writeFileSync(filename, headers + data);
  console.log(`Datos exportados a ${filename}`);
}

// SCRAPING -  Scraping en página y almacenamiento en arreglo
async function scrapeChiletrabajos(maxJobs = 1) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let jobs = [];
  let currentPage = 1;

  while (jobs.length < maxJobs) {
    // Medir tiempo de scraping
    const startScrapingTime30 = Date.now();


    const url = `https://www.chiletrabajos.cl/trabajos/informatica/${(currentPage - 1) * 1}`;
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
        //title = document.querySelector('.title.titulo-detalle').innerText;  // Título
        title = document.querySelector('h1.title.titulo-detalle.text-uppercase').innerText;  // Título
        

        const company = "por defecto";
        // const location = "por defecto";
        //const location = document.querySelector('div.box.px-3.border.mt-2.no-pointer div.datos.mt-3 div.row div.col-12.col-sm-12.col-md-12.col-lg-7 table.table.table-sm tbody');
        //2 const locationElement = document.querySelector('div.box.px-3.border.mt-2.no-pointer div.datos.mt-3 div.row div.col-12.col-sm-12.col-md-12.col-lg-7 table.table.table-sm tbody');
        //2 const location = locationElement ? locationElement.textContent.trim() : 'No disponible';

        const detailsJobElement = document.querySelector('table.table.table-sm tbody');
        let location = 'No disponible';
        let type = 'No disponible';
        
        if (detailsJobElement) {
          const rows = detailsJobElement.querySelectorAll('tr');
          rows.forEach(row => {
            const label = row.querySelector('td:nth-child(1)').innerText.trim();
            if (label === 'Ubicación') {
              location = row.querySelector('td:nth-child(2)').innerText.trim();
            }
            if(label === 'Tipo'){
              type = row.querySelector('td:nth-child(2)').innerText.trim();
            }
          });
        }
      
        const descripcionElement = document.querySelector('div.job-item.no-hover.with-thumb.pb-2.detalle div.p-x-3.overflow-hidden div p.mb-0');
        const description = descripcionElement.innerHTML
        .replace(/<br\s*\/?>/gi, ' ') // Reemplazar <br> por espacio
        .replace(/\n/g, ' ')          // Eliminar saltos de línea
        .replace(/\s+/g, ' ')         // Normalizar espacios en blanco
        .trim();                      // Eliminar espacios al principio y al final
        //descripcionElement.innerHTML.replace(/<br\s*\/?>/gi, ' ');
        return {
          title,
          location,
          type,
          description
          // isRemote: location.includes('Remoto') || location.includes('Híbrido'),  // Determina si es remoto
        };
      });

      jobs.push(jobDetails);

      // Si ya se tiene x trabajos, salir del bucle
      if (jobs.length >= maxJobs) {
        break;
      }
    }

    console.log(`Página ${currentPage}: Se obtuvieron ${jobs.length} trabajos.`);
    currentPage++;  // Pasar a la siguiente página

    const endScrapingTime30 = Date.now();
    const scrapingElapsedTime30 = (endScrapingTime30 - startScrapingTime30) / 1000; // Convertir a segundos
    console.log(`Tiempo de scraping: ${scrapingElapsedTime30} segundos`);
  }

  // Guardar en MongoDB
  // for (const job of jobs) {
  //   const newJob = new Job(job);
  //   await newJob.save();
  // }

  

  //console.log(`Se guardaron ${jobs.length} trabajos en la base de datos.`);
  await browser.close();
  guardarEnCSV(jobs, 'empleos2.csv')

  const endScrapingTime = Date.now();
  const scrapingElapsedTime = (endScrapingTime - startScrapingTime) / 1000; // Convertir a segundos
  console.log(`Tiempo de scraping: ${scrapingElapsedTime} segundos`);
}


async function scrapeTest(maxJobs = 30){
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
