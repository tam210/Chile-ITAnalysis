import React, { useEffect, useState } from 'react';
import './techcards.css'; // Asegúrate de importar los estilos

function TechCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/top-tech')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos:', data); // Verifica que los datos se reciben correctamente
        setData(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  // Determina el valor máximo de frecuencia para normalizar las barras
  const maxFrequency = data.length > 0 ? Math.max(...data.map(tech => Number(tech.count) || 0)) : 1; // Evita división por ceroconsole.log("aqw,",maxFrequency)
  return (
    <div className="chart-container">
      {data
        .sort((a, b) => b.count - a.count) // Ordenar de mayor a menor
        .map((tech, index) => (
          <div key={index} className="bar-container">
            <p className="tech-name">{tech.tecnologia}</p>
            <div
              className="bar"
              style={{
                width: `${(Number(tech.count) / maxFrequency) * 50}%`, // Escala a la mitad
                backgroundColor: getBarColor(tech.count, maxFrequency), // Color según frecuencia
              }}
            />
            <p className="frequency-text">{tech.count}</p>
          </div>
        ))}
    </div>
    

  );
}

// Función para obtener el color de la barra según la frecuencia
function getBarColor(frequency, maxFrequency) {
  const percentage = (frequency / maxFrequency) * 100;
  if (percentage > 70) return '#4caf50'; // Verde para alta frecuencia
  if (percentage > 45) return '#ff9800'; // Naranja para frecuencia media
  return '#f44336'; // Rojo para baja frecuencia
}

export default TechCards;
