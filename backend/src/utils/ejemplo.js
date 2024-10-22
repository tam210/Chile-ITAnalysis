const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');
// Ruta al archivo CSV (cambia esto por la ruta de tu archivo)
const csvFilePath = path.join(__dirname, '../spark/top_tecnologias_op_2.csv/part-00000-ac19a8e3-5d3f-4241-ba3e-2e9c94213367-c000.csv');

// Leer el archivo CSV
fs.readFile(csvFilePath, 'utf8', (err, csvData) => {
  if (err) {
    console.error('Error al leer el archivo CSV:', err);
    return;
  }

  // Parsear el CSV a JSON usando PapaParse
  Papa.parse(csvData, {
    header: true,  // Usar encabezados como claves
    complete: function (results) {
      console.log("Datos procesados desde CSV:", results.data);  // Mostrar los datos procesados
    },
    error: function (error) {
      console.error('Error al parsear el CSV:', error);
    }
  });
});
