import React, { useState } from 'react';
import './styles/App.css'; 
import Buscador from './components/buscador';
import Actividad from './components/actividad';
import actividadesData from './data/actividades';

export default function App() {
  // Guarda el texto que escribe el usuario en el input, lo inicializa como string vacío
  const [busqueda, setBusqueda] = useState('');

  // Normaliza (quita tildes y convierte a minúsculas)
  const normalizar = (texto) =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // Filtra las actividades según el texto que escribe el usuario
  // FIltra por título, horario, profesor y categoría
  // Si no hay coincidencias, lo dice
  const actividadesFiltradas = actividadesData.filter((actividad) => {
    const titulo = normalizar(actividad.titulo);
    const horario = normalizar(actividad.horario);
    const profesor = normalizar(actividad.profesor);
    const categoria = normalizar(actividad.categoria || '');

    // Normaliza la búsqueda del usuario
    const busquedaNormalizada = normalizar(busqueda);

    return (
      titulo.includes(busquedaNormalizada) ||
      horario.includes(busquedaNormalizada) ||
      profesor.includes(busquedaNormalizada) ||
      categoria.includes(busquedaNormalizada)
    );
  });

  return (
    <div className="app-container">
      <h1>Actividades disponibles</h1>
      <Buscador setBusqueda={setBusqueda} />
      {actividadesFiltradas.length === 0 ? (
        <p>No se encontraron actividades.</p>
      ) : (
        actividadesFiltradas.map((actividad, i) => (
          <Actividad key={i} {...actividad} />
        ))
      )}
    </div>
  );
}
