import './HeaderBar.css';
import React, { useState } from 'react';
import LoginDialog from './LoginDialog'; // Importamos el LoginDialog
import { useTheme } from '../context/ThemeContext';

export default function HeaderBar() {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false); // Estado para controlar el LoginDialog
  const baseHeight = 120;
  const { toggleTheme } = useTheme();
    const handleThemeClick = () => {
    console.log('[CLICK] Icono izquierdo presionado');
    toggleTheme();
  };
  const openLoginDialog = () => {
    setLoginDialogOpen(true); // Abrir el LoginDialog
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false); // Cerrar el LoginDialog
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

      {/* Ícono derecho que abre el LoginDialog */}
      <div className="icon right-icon" onClick={openLoginDialog}>
        <div className="background" />
        <img
          src="/global/login.png"
          alt="Login Icon"
        />
      </div>

      {/* Fondo delgado lateral derecho */}
      <div className="side-strip right-strip"></div>

      {/* Aquí pasamos el estado del diálogo y la función para cerrarlo */}
      <LoginDialog isOpen={isLoginDialogOpen} closeDialog={closeLoginDialog} />
    </header>
  );
}
