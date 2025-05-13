// AboutUsPage.jsx
import React from "react";
import "./AboutUsPage.css"; // Asegúrate de tener este archivo de CSS con los estilos necesarios

export default function AboutUsPage() {
  return (
    <div className="aboutUsPage">
      <h1>Sobre Nosotros</h1>

      {/* Contenedor con imagen y fondo */}
      <div className="aboutUsInfo">
        {/* Panel de Imagen Grande (Arriba) */}
        <div className="panelImagen">
          <img src="path_to_large_image.png" alt="Panel Imagen" className="panelImage" />
        </div>

        {/* Imagen Pequeña (Abajo a la izquierda) */}
        <div className="imagenPequeña">
          <img src="path_to_small_image.png" alt="Imagen Pequeña" className="smallImage" />
        </div>
      </div>
    </div>
  );
}
