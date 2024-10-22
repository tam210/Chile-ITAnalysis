import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>TOP TECNOLOGÍAS</h1>
      <p>Explora las tecnologías más demandadas de chiletrabajos:</p>
      <Link to="/top-tech">Ver Tecnologías</Link>
    </div>
  );
}

export default Home;
