/*import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado: npm install axios

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  const [loading, setLoading] = useState(true); // Nuevo estado para el loading

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Inicia el loading
    setError(null); // Limpia errores anteriores
    const token = localStorage.getItem('token'); // <--- Obtén el token del localStorage

    if (!token) {
        setError('No hay token de autenticación. Por favor, inicia sesión como administrador.');
        setLoading(false);
        return;
    }

    try {
      const res = await axios.get('http://localhost:3001/users', {
        headers: {
          'Authorization': `Bearer ${token}` // <--- ¡Añade el header de autorización!
        }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      if (error.response && error.response.status === 403) {
          setError('Acceso denegado. No tienes permisos de administrador para ver esta información.');
      } else {
          setError('Error al obtener usuarios. Por favor, inténtalo de nuevo.');
      }
    } finally {
        setLoading(false); // Finaliza el loading
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

  // Estilos inline, los mantengo de tu código
  const headerCellStyle = { padding: '12px 15px', textAlign: 'left', fontWeight: 'bold', borderBottom: '1px solid #ddd' };
  const cellStyle = { padding: '12px 15px', borderBottom: '1px solid #ddd' };
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

  if (loading) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#333' }}>Cargando usuarios...</div>
      );
  }

  if (error) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'red', fontWeight: 'bold' }}>Error: {error}</div>
      );
  }


  return (
    <>
     
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

      
      <div
        style={{
          paddingTop: '30px',
          paddingBottom: '30px',
          paddingLeft: '20px',
          paddingRight: '20px',
          position: 'relative',
          maxWidth: '120vh',
          margin: 'auto',
          paddingTop: '30px',
          paddingBottom: '30px',
          zIndex: 1,
          backgroundColor: '#f1f1f9', // Color de fondo del contenedor principal de la tabla
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
       
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o rol"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flexGrow: 1, marginRight: '15px', padding: '8px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
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

      
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#e0e0e0' }}>
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
                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
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

export default UserManager;
*/