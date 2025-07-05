import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchTabla = async (id) => {
  const res = await axios.get(`http://localhost:8000/api/public/standings/${id}/`);
  return res.data;
};

export default function Tabla() {
  const { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['standings', id],
    queryFn: () => fetchTabla(id),
  });

  const recalcular = async () => {
    setCargando(true);
    setMensaje(null);
    try {
      await axios.get(`http://localhost:8000/api/calculate-standings/${id}/`);
      setMensaje('✅ Tabla actualizada correctamente');
      refetch();
    } catch (err) {
      setMensaje('❌ Error al actualizar la tabla');
    } finally {
      setCargando(false);
    }
  };

  if (isLoading) return <p>Cargando tabla...</p>;
  if (error) return <p>Error al cargar: {error.message}</p>;

  return (
    <div>
      <h2>Tabla de Posiciones (Torneo #{id})</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>PTS</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team.id}>
              <td>{team.team_name}</td>
              <td>{team.points}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.gf}</td>
              <td>{team.ga}</td>
              <td>{team.gd}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={recalcular} disabled={cargando}>
          {cargando ? 'Actualizando...' : 'Recalcular Tabla'}
        </button>
        {mensaje && <p>{mensaje}</p>}
      </div>

      <Link to="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
          Regresar a Inicio
        </button>
      </Link>
    </div>
  );
}
