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

    {/* Panel dinámico lateral con contenido */}
    <div className="panel">
      <div className="panel-content">
        <p><strong>Autor:</strong> {document.autor}</p>
        <p><strong>Categoría:</strong> {document.categoria}</p>
        <p><strong>Descripción:</strong> {document.descripcion}</p>
      </div>
    </div>
  </div>

  );
};

export default InteractiveBook;
