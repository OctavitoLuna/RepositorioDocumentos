// LoginDialog.jsx
import React, { useState } from "react";
import "./LoginDialog.css"; // Asegúrate de tener este archivo de CSS con los estilos necesarios

export default function LoginDialog({ isOpen, closeDialog }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login details:", username, password);
    closeDialog(); // Cierra el diálogo después de iniciar sesión
  };

  if (!isOpen) return null; // Si el diálogo no está abierto, no se renderiza

  return (
    <div className="loginDialog">
      <div className="loginDialogContent">
        {/* Botón de Cerrar */}
        <button className="closeButton" onClick={closeDialog}>X</button>
        
        {/* Icono de persona fuera del contenedor */}
        <div className="loginIconWrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="loginIcon"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M12 14c4 0 6 2 6 6H6c0-4 2-6 6-6z" />
          </svg>
        </div>

        {/* Título de Iniciar Sesión */}
        <h2 className="loginTitle">INICIAR SESIÓN</h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={handleLogin}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
