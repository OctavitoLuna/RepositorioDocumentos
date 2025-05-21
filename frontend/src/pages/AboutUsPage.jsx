// AboutUsPage.jsx
import React from "react";
import "./AboutUsPage.css"; // Asegúrate de tener este archivo de CSS con los estilos necesarios

export default function AboutUsPage() {
  return (
    <div className="aboutUsPage">
    <h1 style={{ marginTop: '0vh', color: 'white', padding: '10px' }}> </h1>
      {/* Contenedor con imagen y fondo */}
      <div className="aboutUsInfo">
        {/* Panel de Imagen Grande (Arriba) */}
        <div className="panelImagen">
          <img src="/aboutUs/team.jpg" alt="Panel Imagen" className="panelImage" />
        </div>

        {/* Imagen Pequeña (Abajo a la izquierda) */}
        <div className="imagenPequeña">
          <img src="/aboutUs/work.jpg" alt="Imagen Pequeña" className="smallImage" />
        </div>
      </div>
    </div>
  );
}
