import './HeaderBar.css';
import React, { useState, useEffect } from 'react';
import InicioSesion from './LoginDialog.jsx'; // Asegúrate de que la extensión sea correcta
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function HeaderBar() {
  const navigate = useNavigate();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const baseHeight = 120;
  const { toggleTheme } = useTheme();

  // useEffect para verificar el estado de login al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parseando usuario de localStorage:", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const getRoleName = (rolString) => {
    switch (rolString) {
      case 'admin':
        return "Administrador";
      case 'investigador':
        return "Investigador";
      case 'visitante':
        return "Visitante";
      default:
        return "Usuario";
    }
  };

  const handleThemeClick = () => {
    console.log('[CLICK] Icono izquierdo presionado');
    toggleTheme();
  };

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
    setShowAdminOptions(false);
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  const handleLoginSuccess = (user, token) => {
    console.log("HeaderBar: Login exitoso. Usuario:", user, "Token:", token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedInUser(user);
    setLoginDialogOpen(false);
    setShowAdminOptions(true); // Muestra el dropdown inmediatamente
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setShowAdminOptions(false); // Oculta el dropdown al cerrar sesión
    console.log("Sesión cerrada.");
    navigate('/');
  };

  const handleLoginIconClick = () => {
    if (loggedInUser) {
      setShowAdminOptions(prev => !prev);
    } else {
      openLoginDialog();
    }
  };

  const handlePersonalizarPerfilClick = () => {
    console.log('Navegar a Personalizar Perfil');
    setShowAdminOptions(false); // Cierra el dropdown al hacer clic
    // Aquí podrías navegar a una ruta de perfil, por ejemplo:
    // navigate('/perfil');
  };

  return (
    <header className="header-bar" style={{ height: `${baseHeight}px` }}>
      <div className="side-strip left-strip" />

      <div className="icon left-icon" onClick={handleThemeClick}>
        <div className="background" />
        <img
          src="/global/theme.png"
          alt="Theme Icon"
          className="clickable-icon"
        />
      </div>

      <div className="center-bar">
        <h1 className="header-title">Repositorio de Documentos Históricos</h1>
      </div>

      <div className="icon right-icon" onClick={handleLoginIconClick}>
        <div className="background" />
        <img
          src="/global/login.png"
          alt="User Icon"
        />
      </div>

      <div className="side-strip right-strip"></div>

      <InicioSesion
        isOpen={isLoginDialogOpen}
        onClose={closeLoginDialog}
        onLogin={handleLoginSuccess}
      />

      {loggedInUser && showAdminOptions && (
        <div className="admin-options-dropdown">
          <div className="user-info-display">
            {loggedInUser.nombre} ({getRoleName(loggedInUser.rol)})
          </div>
          {/* Botón Personalizar Perfil para todos los usuarios logueados */}
          <div className="admin-option-button" onClick={handlePersonalizarPerfilClick}>
            Personalizar Perfil
          </div>
          {loggedInUser.rol === 'admin' && ( // Solo para admins
            <>
              {/* Puedes mantener opciones específicas de admin si las necesitas */}
              {/* <div className="admin-option-button" onClick={() => {
                console.log('Navegar a Administrar Usuarios');
                setShowAdminOptions(false);
              }}>
                Administrar Usuarios
              </div>
              <div className="admin-option-button" onClick={() => {
                console.log('Navegar a Administrar Foros');
                setShowAdminOptions(false);
              }}>
                Administrar Foros
              </div> */}
            </>
          )}
          <div className="admin-option-button logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </div>
        </div>
      )}
    </header>
  );
}
