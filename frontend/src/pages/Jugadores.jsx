import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const fetchJugadores = async () => {
  const res = await axios.get('http://localhost:8000/api/players/');
  return res.data;
};

const fetchEquipos = async () => {
  const res = await axios.get('http://localhost:8000/api/teams/');
  return res.data;
};

export default function Jugadores() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const { data: jugadores, isLoading } = useQuery({
    queryKey: ['jugadores'],
    queryFn: fetchJugadores,
  });
  const { data: equipos } = useQuery({
    queryKey: ['equipos'],
    queryFn: fetchEquipos,
  });

  const onSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:8000/api/players/', formData);
      reset();
      queryClient.invalidateQueries(['jugadores']);
    } catch (err) {
      alert('Error al crear jugador');
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Jugadores registrados</h2>
      <ul>
        {jugadores.map((j) => (
          <li key={j.id}>
            {j.first_name} {j.last_name} ({j.position}) - {j.team}
          </li>
        ))}
      </ul>

      <h3>Registrar nuevo jugador</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('first_name')} placeholder="Nombre" required />
        <input {...register('last_name')} placeholder="Apellido" required />
        <input type="date" {...register('birth_date')} required />
        <select {...register('position')} required>
          <option value="">Posición</option>
          <option value="GK">Arquero</option>
          <option value="DF">Defensa</option>
          <option value="MF">Mediocampo</option>
          <option value="FW">Delantero</option>
        </select>
        <select {...register('team')} required>
          <option value="">Equipo</option>
          {equipos?.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <button type="submit">Guardar jugador</button>
      </form>

      <Link to="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
          Regresar a Inicio
        </button>
      </Link>
    </div>
  );
}
