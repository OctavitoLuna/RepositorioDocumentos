import React from 'react';
import './InteractiveBook.css'; // Importamos el CSS para los estilos

const bookImagePath = '/home/bookTape.png'; // Nueva imagen

const InteractiveBook = ({ document, position }) => {
  return (
    <div className={`interactive-book-item ${position}`}>
      <div className="book-image-container">
        <img src={bookImagePath} alt={document.titulo} />
        <div className="overlay-text">
          <h3>{document.titulo}</h3>
        </div>
      </div>
      <div className="panel" /> {/* Panel dinámico */}
    </div>
  );
};

export default InteractiveBook;
