import React, { useState } from 'react';

export default function FiltroLibro({ onFilterChange }) {
  const [filtro, setFiltro] = useState('titulo'); // Por defecto solo título

  const handleChange = (e) => {
    setFiltro(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div style={{
      marginBottom: '20px',
      display: 'flex',
      gap: '30px',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      padding: '15px 30px',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    }}>
      <label style={{ cursor: 'pointer', fontWeight: '600' }}>
        <input
          type="radio"
          value="titulo"
          checked={filtro === 'titulo'}
          onChange={handleChange}
          style={{ marginRight: '8px', cursor: 'pointer' }}
        />
        Solo Título
      </label>

      <label style={{ cursor: 'pointer', fontWeight: '600' }}>
        <input
          type="radio"
          value="autor"
          checked={filtro === 'autor'}
          onChange={handleChange}
          style={{ marginRight: '8px', cursor: 'pointer' }}
        />
        Solo Autor
      </label>
    </div>
  );

}
