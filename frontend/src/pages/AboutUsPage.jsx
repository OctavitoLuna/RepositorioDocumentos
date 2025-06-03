import React from "react";
import "./AboutUsPage.css";

export default function AboutUsPage() {
  return (
    <div className="aboutUsPage">
      <h1 style={{ marginTop: '0vh', color: 'white', padding: '10px' }}>4-HUB</h1>

      <div className="aboutUsInfo">
        {/* Panel de Imagen Grande con texto a la derecha */}
        <div className="panelConTexto">
          <div className="panelImagen">
            <img src="/aboutUs/team.jpg" alt="Equipo" className="panelImage interactiveImage" />
          </div>
          <div className="textoDerecha">
            <h2>Pasión y Tecnología</h2>
            <p>
              Somos un equipo multidisciplinario que combina creatividad con experiencia técnica para construir
              experiencias digitales inmersivas. Utilizamos React, Node.js y MongoDB Cloud para crear soluciones
              escalables y envolventes.
            </p>
            <p>
              Trabajamos con un enfoque colaborativo y orientado a la innovación, siempre buscando superar las
              expectativas y conectar con los usuarios en entornos 3D interactivos.
            </p>
          </div>
        </div>

        {/* Imagen Pequeña con texto a la izquierda */}
        <div className="panelConTexto reverse">
          <div className="textoIzquierda">
            <h2>Innovación y Colaboración</h2>
            <p>
              Nuestra fuerza radica en el trabajo en equipo y la integración de tecnologías punteras. Cada proyecto
              es una oportunidad para crecer, aprender y entregar un producto con valor real y atractivo visual.
            </p>
            <p>
              Nos adaptamos a las necesidades y creamos experiencias únicas con animaciones suaves y diseño
              responsivo que mejora la interacción del usuario.
            </p>
          </div>
          <div className="imagenPequeña">
            <img src="/aboutUs/work.jpg" alt="Trabajo en equipo" className="smallImage interactiveImage" />
          </div>
        </div>
      </div>
    </div>
  );
}
