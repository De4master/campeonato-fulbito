import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const fetchEquipos = async () => {
  const res = await axios.get('https://campeonato-fulbito-production.up.railway.app/api/teams/');
  return res.data;
};

export default function Equipos() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['equipos'],
    queryFn: fetchEquipos,
    enabled: !!token,
  });

  const onSubmit = async (formData) => {
    try {
      await axios.post('https://campeonato-fulbito-production.up.railway.app/api/teams/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      queryClient.invalidateQueries(['equipos']);
    } catch (err) {
      alert('Error al crear el equipo');
    }
  };

  if (isLoading) return <div className="card"><p>Cargando equipos...</p></div>;
  if (error) return <div className="card"><p>Error: {error.message}</p></div>;

  return (
    <div className="centered-container">
      <div className="card-box">
        <h2>📋 Lista de Equipos</h2>
        <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
          {data.map((team) => (
            <li key={team.id}>
              {team.name} <span style={{ color: '#555' }}>(DT: {team.coach_name})</span>
            </li>
          ))}
        </ul>

        <h3>➕ Registrar nuevo equipo</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}
        >
          <input
            {...register('name')}
            placeholder="Nombre del equipo"
            required
            className="form-input"
          />
          <input
            {...register('coach_name')}
            placeholder="Nombre del DT"
            required
            className="form-input"
          />
          <input
            type="number"
            {...register('founded')}
            placeholder="Año de fundación"
            required
            className="form-input"
          />
          <button type="submit" className="btn blue">Guardar</button>
        </form>

        <Link to="/">
          <button className="btn gray">Regresar a Inicio</button>
        </Link>
      </div>
    </div>
  );
}
