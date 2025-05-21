// ContactPage.jsx
import React from "react";
import "./ContactPage.css"; // Asegúrate de tener este archivo de CSS con los estilos necesarios

export default function ContactPage() {
  return (
    <div className="contactPage">
      <h1 style={{ marginTop: '3vh', color: 'white', padding: '10px' }}> </h1>

      {/* Imagen grande arriba */}
      <div className="bigImageContainer">
        <img src="/global/contact/ucb.webp" alt="Imagen UCB" className="bigImage" />
      </div>
      <div className="contactInfo">
        <div className="logoPanel">
          <img src="/global/contact/logo.png" alt="Logo" className="logoImage" />
        </div>

        <div className="qrPanel">
          {/* Distribución de los 3 QR */}
          <div className="qrImageWrapper">
            <img src="/global/Commons_QR_code.png" alt="QR Code 1" className="qrImage" />
          </div>
          <div className="qrImageWrapper">
            <img src="/global/Commons_QR_code.png" alt="QR Code 2" className="qrImage" />
          </div>
          <div className="qrImageWrapper">
            <img src="/global/Commons_QR_code.png" alt="QR Code 3" className="qrImage" />
          </div>
        </div>
      </div>
    </div>
  );
}
