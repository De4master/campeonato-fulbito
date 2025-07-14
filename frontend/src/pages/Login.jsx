// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://campeonato-fulbito-production.up.railway.app/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        login(data.access);
        navigate('/');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h2 className="main-title">🔐 Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={credentials.username}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            className="input"
            required
          />
          <button type="submit" className="btn blue">Ingresar</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
