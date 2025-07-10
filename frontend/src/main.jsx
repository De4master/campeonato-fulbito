// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import Equipos from './pages/Equipos';
import Jugadores from './pages/Jugadores';
import Tabla from './pages/Tabla';
import Calendario from './pages/Calendario';
import Login from './pages/Login'; // 👈 NUEVO: importamos Login

import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/tabla/:id" element={<Tabla />} />
            <Route path="/calendario/:id" element={<Calendario />} />
            <Route path="/login" element={<Login />} /> {/* 👈 NUEVA ruta */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
