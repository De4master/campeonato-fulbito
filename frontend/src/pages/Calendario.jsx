// src/pages/Calendario.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchPartidosPorEtapa = async (id) => {
  const res = await axios.get(`http://localhost:8000/api/public/schedule/${id}/`);
  return res.data;
};

export default function Calendario() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['partidos', id],
    queryFn: () => fetchPartidosPorEtapa(id),
  });

  if (isLoading) return <div className="card"><p>Cargando partidos...</p></div>;
  if (error) return <div className="card"><p>Error al cargar: {error.message}</p></div>;

  return (
    <div className="card">
      <h2>📅 Calendario de Partidos (Etapa #{id})</h2>

      {data.map((partido) => (
        <div
          key={partido.id}
          className="match-card"
        >
          <h3 className="match-title">
            ⚽ {partido.team_home} vs {partido.team_away}
          </h3>
          <p><strong>📆 Fecha:</strong> {partido.date}</p>
          <p><strong>🏟️ Cancha:</strong> {partido.venue}</p>
          <p><strong>🧑‍⚖️ Árbitro:</strong> {partido.referee}</p>

          <div>
            <h4>📋 Eventos:</h4>
            <ul>
              {partido.events.length === 0 ? (
                <li>Sin eventos registrados</li>
              ) : (
                partido.events.map((ev) => (
                  <li key={ev.id}>
                    {ev.minute}' - {ev.event_type} - {ev.player}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ))}

      <Link to="/">
        <button className="btn gray">Regresar a Inicio</button>
      </Link>
    </div>
  );
}
