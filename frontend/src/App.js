import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import TechCards from './components/techcards';
import About from './components/about';
import './styles/navbar.css'; // Importar los estilos de la barra de navegación

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
