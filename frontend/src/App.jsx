import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  

export default function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Campeonato de Fulbito</h1>
      <nav>
        <ul>
          <li><Link to="/equipos">Ver Equipos</Link></li>
          <li><Link to="/jugadores">Ver Jugadores</Link></li>
          <li><Link to="/tabla/1">Ver Tabla (Torneo #1)</Link></li>
          <li><Link to="/calendario/1">Ver Fixture (Etapa #1)</Link></li>
        </ul>
      </nav>
    </div>
  );
}
