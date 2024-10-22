import React, { useEffect, useState } from 'react';

function TechCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/top-tech')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);
  console.log(data)
  return (
    <div className="cards-container">
      {data.map((tech, index) => (
        <div key={index} className="card" style={{ backgroundColor: getColor(index) }}>
          <h3>{tech.tecnologia}</h3>
          <p>Frecuencia: {tech.frecuencia}</p>
        </div>
      ))}
    </div>
  );
}

// Función para asignar colores a las tarjetas
function getColor(index) {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD433'];
  return colors[index % colors.length];
}

export default TechCards;
