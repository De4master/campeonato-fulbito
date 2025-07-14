import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchTabla = async (id) => {
  const res = await axios.get(`https://campeonato-fulbito-production.up.railway.app/api/public/standings/${id}/`);
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
      await axios.get(`https://campeonato-fulbito-production.up.railway.app/api/calculate-standings/${id}/`);
      setMensaje('✅ Tabla actualizada correctamente');
      refetch();
    } catch (err) {
      setMensaje('❌ Error al actualizar la tabla');
    } finally {
      setCargando(false);
    }
  };

  if (isLoading) return <div className="card"><p>Cargando tabla...</p></div>;
  if (error) return <div className="card"><p>Error al cargar: {error.message}</p></div>;

  return (
    <div className="centered-container">
      <div className="card-box">
        <h2>📊 Tabla de Posiciones (Torneo #{id})</h2>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
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
        </div>

        <div style={{ marginBottom: '15px' }}>
          <button
            className="btn yellow"
            onClick={recalcular}
            disabled={cargando}
          >
            {cargando ? 'Actualizando...' : 'Recalcular Tabla'}
          </button>
          {mensaje && <p style={{ marginTop: '10px' }}>{mensaje}</p>}
        </div>

        <Link to="/">
          <button className="btn gray">Regresar a Inicio</button>
        </Link>
      </div>
    </div>
  );
}
