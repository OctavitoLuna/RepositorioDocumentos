import React, { useState } from 'react';

export default function AddCollectionForm({ onCreate }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert('El nombre es obligatorio');
    onCreate({ nombre, descripcion });
    setNombre('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Crear nueva colección</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        required
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button type="submit" style={{
        padding: '8px 15px',
        cursor: 'pointer',
        backgroundColor: '#D46D1E',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
      }}>
        Crear
      </button>
    </form>
  );
}
