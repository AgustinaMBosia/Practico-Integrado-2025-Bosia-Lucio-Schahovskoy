import React, { useState } from 'react';

export default function Actividad({ titulo, horario, profesor }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
        <h3>{titulo}</h3>
        <p><strong>Horario:</strong> {horario}</p>
        <p><strong>Profesor:</strong> {profesor}</p>
      </div>
    );
  }
