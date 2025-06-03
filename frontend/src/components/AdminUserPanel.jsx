import React, { useState, useEffect } from 'react';
import './AdminUserPanel.css'; // Asegúrate de que esta ruta sea correcta

const AdminUserPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // Para editar un usuario
    const [isFormVisible, setIsFormVisible] = useState(false); // Para mostrar/ocultar el formulario de crear/editar
    const [message, setMessage] = useState(null); // Para mensajes de éxito/error
    const [messageType, setMessageType] = useState(null); // 'success' o 'error'
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Para el modal de confirmación de eliminación
    const [userToDelete, setUserToDelete] = useState(null); // ID del usuario a eliminar

    useEffect(() => {
        fetchUsers();
    }, []);

    // Función para mostrar mensajes temporales
    const displayMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        const timer = setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000); // El mensaje desaparece después de 5 segundos
        return () => clearTimeout(timer);
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No hay token de autenticación. Inicia sesión como administrador.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Acceso denegado. No tienes permisos de administrador.');
                }
                throw new Error(`Error al cargar usuarios: ${response.statusText}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching users:', err);
            displayMessage(`Error al cargar usuarios: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = () => {
        setSelectedUser(null); // Asegura que el formulario esté en modo creación
        setIsFormVisible(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user); // Carga los datos del usuario en el formulario
        setIsFormVisible(true);
    };

    // Abre el modal de confirmación antes de eliminar
    const confirmDeleteUser = (userId) => {
        setUserToDelete(userId);
        setShowConfirmModal(true);
    };

    const handleDeleteUser = async () => {
        setShowConfirmModal(false); // Cierra el modal de confirmación
        if (!userToDelete) return; // Si no hay usuario para eliminar, sal

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3001/users/${userToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Acceso denegado. No tienes permisos para eliminar usuarios.');
                }
                throw new Error(`Error al eliminar usuario: ${response.statusText}`);
            }

            await response.json();
            displayMessage('Usuario eliminado exitosamente.', 'success');
            fetchUsers(); // Vuelve a cargar la lista de usuarios
        } catch (err) {
            setError(err.message);
            console.error('Error deleting user:', err);
            displayMessage(`Error al eliminar usuario: ${err.message}`, 'error');
        } finally {
            setUserToDelete(null); // Limpia el ID del usuario a eliminar
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No hay token de autenticación.');
            displayMessage('No hay token de autenticación. Por favor, inicia sesión.', 'error');
            return;
        }

        const method = selectedUser ? 'PUT' : 'POST';
        const url = selectedUser ? `http://localhost:3001/users/${selectedUser._id}` : 'http://localhost:3001/users';

        // Eliminar contraseña si está vacía en modo edición (para no sobreescribirla con vacío)
        if (method === 'PUT' && !userData.contrasenia) {
            delete userData.contrasenia;
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Acceso denegado. No tienes permisos para esta acción.');
                }
                const errorData = await response.json();
                throw new Error(errorData.mensaje || `Error de la API: ${response.statusText}`);
            }

            await response.json();
            displayMessage(`Usuario ${selectedUser ? 'actualizado' : 'creado'} exitosamente.`, 'success');
            setIsFormVisible(false); // Cierra el formulario
            setSelectedUser(null); // Limpia el usuario seleccionado
            fetchUsers(); // Vuelve a cargar la lista
        } catch (err) {
            setError(err.message);
            console.error(`Error al ${method === 'POST' ? 'crear' : 'actualizar'} usuario:`, err);
            displayMessage(`Error al ${method === 'POST' ? 'crear' : 'actualizar'} usuario: ${err.message}`, 'error');
        }
    };

    if (loading) {
        return <div className="admin-user-panel-container">Cargando usuarios...</div>;
    }

    if (error) {
        return <div className="admin-user-panel-container error-message">Error: {error}</div>;
    }

    return (
        <div className="admin-user-panel-container"> {/* Asegúrate de que esta clase esté aquí */}
            <h2>Gestión de Usuarios (Panel de Administrador)</h2>

            {message && <div className={`message ${messageType}`}>{message}</div>}

            <div className="admin-user-panel-header">
                <input
                    type="text"
                    placeholder="Buscar por nombre, apellido o rol"
                    // Aquí deberías conectar esto a tu estado de búsqueda si aún no lo has hecho
                    // value={searchTerm}
                    // onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleCreateUser} className="create-user-button">
                    Crear Nuevo Usuario
                </button>
            </div>

            <div className="users-list">
                {users.length === 0 ? (
                    <p>No hay usuarios registrados.</p>
                ) : (
                    <table className="user-table"> {/* Asegúrate de que esta clase esté aquí */}
                        <thead>
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.nombre} {user.apellido}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.rol}</td>
                                    <td className="action-buttons"> {/* Añade esta clase para los botones */}
                                        <button onClick={() => handleEditUser(user)} className="edit-button">Editar</button>
                                        {/* Solo permitir eliminar si no es el usuario actualmente logueado para evitar auto-eliminación accidental */}
                                        {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).id !== user._id && (
                                            <button onClick={() => confirmDeleteUser(user._id)} className="delete-button">Eliminar</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal-button" onClick={() => { setIsFormVisible(false); setSelectedUser(null); }}>&times;</button>
                        <h2>{selectedUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <label>Nombre:</label>
                            <input type="text" name="nombre" defaultValue={selectedUser?.nombre || ''} required />

                            <label>Apellido:</label>
                            <input type="text" name="apellido" defaultValue={selectedUser?.apellido || ''} required />

                            <label>Correo:</label>
                            <input type="email" name="correo" defaultValue={selectedUser?.correo || ''} required />

                            <label>Contraseña: (vacío si no la cambias)</label>
                            <input type="password" name="contrasenia" />

                            <label>Rol:</label>
                            <select name="rol" defaultValue={selectedUser?.rol || 'visitante'} required>
                                <option value="admin">Administrador</option>
                                <option value="investigador">Investigador</option>
                                <option value="visitante">Visitante</option>
                            </select>

                            <div className="form-actions">
                                <button type="submit">{selectedUser ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
                                <button type="button" onClick={() => { setIsFormVisible(false); setSelectedUser(null); }}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content confirm-modal">
                        <button className="close-modal-button" onClick={() => { setShowConfirmModal(false); setUserToDelete(null); }}>&times;</button>
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.</p>
                        <div className="form-actions">
                            <button onClick={handleDeleteUser} className="delete-button">Eliminar</button>
                            <button onClick={() => { setShowConfirmModal(false); setUserToDelete(null); }} className="cancel-button">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserPanel;
