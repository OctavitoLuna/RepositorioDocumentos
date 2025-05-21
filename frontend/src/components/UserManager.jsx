import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const nombre = user.nombre ? user.nombre.toLowerCase() : '';
    const apellido = user.apellido ? user.apellido.toLowerCase() : '';
    const rol = user.rol ? user.rol.toLowerCase() : '';
    const term = searchTerm.toLowerCase();
    return (
      nombre.includes(term) ||
      apellido.includes(term) ||
      rol.includes(term)
    );
  });

  return (
    <>
      {/* Fondo café oscuro semitransparente que ocupa todo el ancho y altura menor que el contenedor */}
      <div
        style={{
            maxHeight: '24vh',
          position: 'fixed',
          top: '35vh',
          left: 0,
          right: 0,
          bottom: '50px',
          backgroundColor: 'rgba(27, 18, 3, 0.6)',
          borderRadius: '0px',
          zIndex: 0,
        }}
      />

      {/* Contenedor centrado y limitado con contenido, sobre el fondo */}
      <div
        style={{
         paddingTop: '30px',
         paddingBottom: '30px',
         paddingLeft: '20px',    // <-- agregado padding lateral
            paddingRight: '20px',   // <-- agregado padding lateral
          position: 'relative',
          maxWidth: '120vh',
          margin: 'auto',
          paddingTop: '30px',
          paddingBottom: '30px',
          zIndex: 1,
          backgroundColor: '#f1f1f9',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Barra superior: búsqueda y botón añadir */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o rol"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flexGrow: 1, marginRight: '15px', padding: '8px', fontSize: '1rem' }}
          />
          <button
            onClick={() => alert('Funcionalidad añadir pendiente')}
            style={{
              padding: '8px 16px',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Añadir
          </button>
        </div>

        {/* Tabla de usuarios */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={headerCellStyle}>Nombre</th>
              <th style={headerCellStyle}>Apellido</th>
              <th style={headerCellStyle}>Rol</th>
              <th style={headerCellStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '15px', textAlign: 'center' }}>
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={cellStyle}>{user.nombre}</td>
                  <td style={cellStyle}>{user.apellido}</td>
                  <td style={cellStyle}>{user.rol}</td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => alert(`Editar usuario ${user.nombre} pendiente`)}
                      style={actionButtonStyle}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => alert(`Eliminar usuario ${user.nombre} pendiente`)}
                      style={{ ...actionButtonStyle, backgroundColor: '#f44336' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const headerCellStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const cellStyle = {
  padding: '12px 15px',
};

const actionButtonStyle = {
  marginRight: '10px',
  padding: '6px 12px',
  fontSize: '0.9rem',
  cursor: 'pointer',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};

export default UserManager;
