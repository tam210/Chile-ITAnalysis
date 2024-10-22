import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';        // Componente de la página principal
import TechCards from './components/techcards';  // Componente que muestra las tarjetas de tecnologías
import About from './components/about';      // Componente para la página "Sobre"

function App() {
  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/top-tech">Tecnologías</a></li>
            <li><a href="/about">Sobre</a></li>
          </ul>
        </nav>

        {/* Definir rutas usando Routes en lugar de Switch */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-tech" element={<TechCards />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
