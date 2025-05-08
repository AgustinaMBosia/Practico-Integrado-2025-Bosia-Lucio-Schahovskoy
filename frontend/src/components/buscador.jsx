// components/Buscador.jsx
import React from 'react';

export default function Buscador({ setBusqueda }) {
  return (
    <input
      type="text"
      placeholder="Buscar por título, horario o categoría..."
      onChange={event => setBusqueda(event.target.value)}
      style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
    />
  );
}
