import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Asegúrate de crear y importar un archivo CSS para estilos

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">TOP TECNOLOGÍAS</h1>
      <p className="home-description">Explora las tecnologías más demandadas de Chiletrabajos:</p>
      
      <div className="home-links">
        <Link to="/top-tech" className="link-button">Ver Tecnologías</Link>
        <span className="link-disabled">Ver Trabajos Más Populares</span>
        <span className="link-disabled">Ver Tipos de Jornada Según Región</span>
      </div>
    </div>
  );
}

export default Home;
