// LoginDialog.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LoginDialog.css";

export default function LoginDialog({ isOpen, closeDialog }) {
  const [username, setUsername] = useState(""); // Aquí va el correo
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        correo: username,
        contraseña: password,
      });

      // Aquí asume que el backend devuelve token y user
      const { token, user } = response.data;

      // Ejemplo: verificar rol admin
      if (user.rol !== "admin") {
        setError("Solo usuarios admin pueden iniciar sesión");
        return;
      }

      localStorage.setItem("token", token);

      // Puedes guardar el usuario en contexto o estado global aquí si quieres

      console.log("Login exitoso:", user);
      closeDialog();
    } catch (err) {
      setError(err.response?.data?.error || "Error en el login");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="loginDialog">
      <div className="loginDialogContent">
        <button className="closeButton" onClick={closeDialog}>X</button>

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

        <h2 className="loginTitle">INICIAR SESIÓN</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>Correo</label>
          <input
            type="email"
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
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
