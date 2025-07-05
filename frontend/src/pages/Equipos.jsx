import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const fetchEquipos = async () => {
  const res = await axios.get('http://localhost:8000/api/teams/');
  return res.data;
};

export default function Equipos() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['equipos'],
    queryFn: fetchEquipos,
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:8000/api/teams/', formData);
      reset(); // limpia el formulario
      queryClient.invalidateQueries(['equipos']); // actualiza lista
    } catch (err) {
      alert('Error al crear el equipo');
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Lista de Equipos</h2>
      <ul>
        {data.map((team) => (
          <li key={team.id}>{team.name} (DT: {team.coach_name})</li>
        ))}
      </ul>

      <h3>Registrar nuevo equipo</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nombre del equipo" {...register('name')} required />
        <input placeholder="Nombre del DT" {...register('coach_name')} required />
        <input placeholder="Año de fundación" type="number" {...register('founded')} required />
        <button type="submit">Guardar</button>
      </form>

      <Link to="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
          Regresar a Inicio
        </button>
      </Link>
    </div>
  );
}
