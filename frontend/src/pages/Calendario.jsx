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

  if (isLoading) return <p>Cargando partidos...</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;

  return (
    <div>
      <h2>Calendario de Partidos (Etapa #{id})</h2>
      {data.map((partido) => (
        <div key={partido.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 20 }}>
          <h4>{partido.team_home} vs {partido.team_away}</h4>
          <p><strong>Fecha:</strong> {partido.date}</p>
          <p><strong>Cancha:</strong> {partido.venue}</p>
          <p><strong>Árbitro:</strong> {partido.referee}</p>
          <h5>Eventos:</h5>
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
      ))}
      
      <Link to="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
          Regresar a Inicio
        </button>
      </Link>
    </div>
  );
}
