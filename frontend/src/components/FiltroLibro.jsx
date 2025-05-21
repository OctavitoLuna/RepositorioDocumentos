import React, { useState } from 'react';

export default function FiltroLibro({ onFilterChange }) {
  const [filtro, setFiltro] = useState('titulo'); // Por defecto solo título

  const handleChange = (e) => {
    setFiltro(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
      <label>
        <input
          type="radio"
          value="titulo"
          checked={filtro === 'titulo'}
          onChange={handleChange}
        />
        Solo Título
      </label>

      <label>
        <input
          type="radio"
          value="autor"
          checked={filtro === 'autor'}
          onChange={handleChange}
        />
        Solo Autor
      </label>
    </div>
  );
}
