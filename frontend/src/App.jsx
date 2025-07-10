// src/App.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useAuth } from '../context/AuthContext';

export default function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="main-title">🏆 Campeonato de Fulbito</h1>

        <nav className="main-nav">
          <ul className="nav-buttons">
            {isAuthenticated && (
              <>
                <li><Link className="btn blue" to="/equipos">📋 Ver Equipos</Link></li>
                <li><Link className="btn green" to="/jugadores">👟 Ver Jugadores</Link></li>
              </>
            )}
            <li><Link className="btn purple" to="/tabla/1">📊 Ver Tabla (Torneo #1)</Link></li>
            <li><Link className="btn yellow" to="/calendario/1">🗓️ Ver Fixture (Etapa #1)</Link></li>
            {!isAuthenticated
              ? <li><Link className="btn gray" to="/login">🔐 Iniciar Sesión</Link></li>
              : <li><button className="btn red" onClick={handleLogout}>Cerrar Sesión</button></li>}
          </ul>
        </nav>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Proyecto SENATI · Fulbito</p>
        </footer>
      </div>
    </div>
  );
}
