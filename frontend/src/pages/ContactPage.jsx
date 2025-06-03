import React, { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="contactPage">
      <h1 style={{ marginTop: "3vh", color: "white", padding: "10px" }}>

      </h1>

      {/* Imagen grande arriba */}
      <div className="bigImageContainer">
        <img
          src="/global/contact/ucb.webp"
          alt="Imagen UCB"
          className="bigImage"
        />
      </div>

      <div className="contactInfo">
        {/* Logo Panel con flip */}
        <div
          className={`flipCard ${isFlipped ? "flipped" : ""}`}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          aria-label="Logo UCB con descripción"
        >
          <div className="flipCardInner">
            <div className="flipCardFront">
              <img
                src="/global/contact/logo.png"
                alt="Logo UCB"
                className="logoImage interactiveImage"
              />
            </div>
            <div className="flipCardBack">
              <div className="ucbText">
                <h2>Universidad Católica Boliviana</h2>
                <p>
                  Institución educativa líder, comprometida con la formación
                  integral y excelencia académica, promoviendo valores y
                  desarrollo sostenible en Bolivia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel QR */}
        <div className="qrPanel">
          <div className="qrImageWrapper">
            <img
              src="/global/Commons_QR_code.png"
              alt="QR Code 1"
              className="qrImage interactiveImage"
            />
          </div>
          <div className="qrImageWrapper">
            <img
              src="/global/Commons_QR_code.png"
              alt="QR Code 2"
              className="qrImage interactiveImage"
            />
          </div>
          <div className="qrImageWrapper">
            <img
              src="/global/Commons_QR_code.png"
              alt="QR Code 3"
              className="qrImage interactiveImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
