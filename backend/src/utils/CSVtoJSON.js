const express = require('express');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');  // O usa csv-parser si prefieres
const app = express();

// Ruta para devolver los datos del CSV como JSON
async function getTopTechsJSON(res){
try{
    // Ruta para devolver los datos del CSV como JSON
      const csvFilePath = path.join(__dirname, '../spark/top_tecnologias_op_2.csv/part-00000-ac19a8e3-5d3f-4241-ba3e-2e9c94213367-c000.csv');
      console.log(csvFilePath)
      // Leer el archivo CSV
      fs.readFile(csvFilePath, 'utf8', (err, csvData) => {
        if (err) {
          return res.status(500).json({ error: 'Error al leer el archivo CSV' });
        }
        console.log(csvData)
        // Convertir CSV a JSON usando PapaParse
        Papa.parse(csvData, {
          header: true,
          complete: function(results) {
            const sortedData = results.data.sort((a, b) => b.count - a.count);
            res.status(200).json(sortedData);  // Enviar los datos como JSON al frontend
          },
          error: function(error) {
            res.status(500).json({ error: 'Error al parsear el CSV' });
          }
        });
      });
    }catch(err){
      res.status(500).json({ message: 'Error al obtener las tecnologías' });
    }
  };
    
module.exports = getTopTechsJSON;
