import './HeaderBar.css';
import React, { useState, useEffect } from 'react';
import LoginDialog from './LoginDialog'; // Importamos el LoginDialog
import { useTheme } from '../context/ThemeContext';

export default function HeaderBar() {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const baseHeight = 120; // Asegúrate que esta variable sea la que controla la altura de tu header
  const { toggleTheme } = useTheme();

  // useEffect para verificar el estado de login al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Opcional: Aquí podrías añadir una validación del token con tu backend
      setIsLoggedIn(true);
    }
  }, []);

  const handleThemeClick = () => {
    console.log('[CLICK] Icono izquierdo presionado');
    toggleTheme();
  };

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
    setShowAdminOptions(false); // Asegúrate de que el dropdown se oculte si se abre el diálogo de login
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginDialogOpen(false);
    setShowAdminOptions(true); // Mostrar las opciones de administración inmediatamente después del login
    console.log("Inicio de sesión exitoso!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAdminOptions(false);
    console.log("Sesión cerrada.");
    localStorage.removeItem("token"); // Remover el token del localStorage
    // Puedes redirigir al usuario o hacer otras limpiezas aquí
  };

  // Función principal para el click en el ícono de la persona
  const handleLoginIconClick = () => {
    if (isLoggedIn) {
      // Si está logueado, alternar la visibilidad del dropdown de opciones de administración
      setShowAdminOptions(prev => !prev);
    } else {
      // Si no está logueado, abrir el diálogo de login
      openLoginDialog();
    }
  };

  return (
    <header className="header-bar" style={{ height: `${baseHeight}px` }}>
      {/* Fondo delgado lateral izquierdo */}
      <div className="side-strip left-strip" />

      <div className="icon left-icon" onClick={handleThemeClick}>
        <div className="background" />
        <img
          src="/global/theme.png"
          alt="Theme Icon"
          className="clickable-icon"
        />
      </div>

      {/* Título centrado con barra */}
      <div className="center-bar">
        <h1 className="header-title">Repositorio de Documentos Históricos</h1>
      </div>

      {/* Ícono derecho de la persona (siempre el mismo) */}
      <div className="icon right-icon" onClick={handleLoginIconClick}>
        <div className="background" />
        <img
          src="/global/login.png" // Siempre se muestra el ícono de la persona
          alt="User Icon"
        />
      </div>

      {/* Fondo delgado lateral derecho */}
      <div className="side-strip right-strip"></div>

      {/* Diálogo de Login */}
      <LoginDialog
        isOpen={isLoginDialogOpen}
        closeDialog={closeLoginDialog}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Dropdown de opciones de administración y cerrar sesión */}
      {isLoggedIn && showAdminOptions && (
        <div className="admin-options-dropdown">
          <div className="admin-option-button" onClick={() => console.log('Navegar a Administrar Usuarios')}>
            Administrar Usuarios
          </div>
          <div className="admin-option-button" onClick={() => console.log('Navegar a Administrar Foros')}>
            Administrar Foros
          </div>
          <div className="admin-option-button logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </div>
        </div>
      )}

      {/* HE ELIMINADO EL BLOQUE <nav> AQUÍ
          PORQUE LAS PALABRAS "NOSOTROS", "FOROS", ETC.
          PARECEN ESTAR YA EN TU IMAGEN DE FONDO DEL HEADERBAR
          O SON PARTE DEL DISEÑO POR OTRO CSS.
          SI NO SON PARTE DEL DISEÑO ESTÁTICO Y NECESITAS QUE SEAN ENLACES INTERACTIVOS,
          AVÍSAME Y REINCORPORAREMOS EL <nav> CON LOS AJUSTES DE CSS NECESARIOS. */}

    </header>
  );
}