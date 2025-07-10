import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const fetchJugadores = async () => {
  const res = await axios.get('http://localhost:8000/api/players/');
  return res.data;
};

const fetchEquipos = async () => {
  const res = await axios.get('http://localhost:8000/api/teams/');
  return res.data;
};

export default function Jugadores() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const { data: jugadores = [], isLoading } = useQuery({
    queryKey: ['jugadores'],
    queryFn: fetchJugadores,
    enabled: !!token,
  });

  const { data: equipos = [] } = useQuery({
    queryKey: ['equipos'],
    queryFn: fetchEquipos,
    enabled: !!token,
  });

  const onSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:8000/api/players/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      queryClient.invalidateQueries(['jugadores']);
    } catch (err) {
      alert('Error al crear jugador');
    }
  };

  if (isLoading) return <div className="card"><p>Cargando jugadores...</p></div>;

  return (
    <div className="centered-container">
      <div className="card-box">
        <h2>👟 Jugadores Registrados</h2>
        <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
          {jugadores.map((j) => (
            <li key={j.id}>
              {j.first_name} {j.last_name} ({j.position}) - {j.team}
            </li>
          ))}
        </ul>

        <h3>➕ Registrar nuevo jugador</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}
        >
          <input
            {...register('first_name')}
            placeholder="Nombre"
            required
            className="form-input"
          />
          <input
            {...register('last_name')}
            placeholder="Apellido"
            required
            className="form-input"
          />
          <input
            type="date"
            {...register('birth_date')}
            required
            className="form-input"
          />
          <select
            {...register('position')}
            required
            className="form-input"
          >
            <option value="">Posición</option>
            <option value="GK">Arquero</option>
            <option value="DF">Defensa</option>
            <option value="MF">Mediocampo</option>
            <option value="FW">Delantero</option>
          </select>
          <select
            {...register('team')}
            required
            className="form-input"
          >
            <option value="">Equipo</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>{eq.name}</option>
            ))}
          </select>
          <button type="submit" className="btn green">Guardar jugador</button>
        </form>

        <Link to="/">
          <button className="btn gray">Regresar a Inicio</button>
        </Link>
      </div>
    </div>
  );
}
