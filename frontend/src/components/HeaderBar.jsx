// HeaderBar.jsx
import React, { useState } from "react";
import LoginDialog from "./LoginDialog"; // Importamos el LoginDialog
import './HeaderBar.css';

export default function HeaderBar() {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false); // Estado para controlar el LoginDialog

  const openLoginDialog = () => {
    setLoginDialogOpen(true); // Abrir el LoginDialog
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false); // Cerrar el LoginDialog
  };

  return (
    <header className="header-bar">
      {/* Fondo delgado lateral izquierdo */}
      <div className="side-strip left-strip"></div>

      {/* Ícono izquierdo */}
      <img
        src="/global/theme.png"
        alt="Theme Icon"
        className="icon left-icon"
        onClick={() => console.log('Icono izquierdo clickeado')}
      />

      {/* Título centrado con barra */}
      <div className="center-bar">
        <h1 className="header-title">Repositorio de Documentos Históricos</h1>
      </div>

      {/* Ícono derecho que abre el LoginDialog */}
      <img
        src="/global/login.png"
        alt="Login Icon"
        className="icon right-icon"
        onClick={openLoginDialog} // Al hacer clic, abre el LoginDialog
      />

      {/* Fondo delgado lateral derecho */}
      <div className="side-strip right-strip"></div>

      {/* Aquí pasamos el estado del diálogo y la función para cerrarlo */}
      <LoginDialog isOpen={isLoginDialogOpen} closeDialog={closeLoginDialog} />
    </header>
  );
}
