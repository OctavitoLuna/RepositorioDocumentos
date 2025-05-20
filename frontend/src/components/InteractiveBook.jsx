import React from 'react';
import './InteractiveBook.css'; // Importamos el CSS para los estilos
import PdfViewer from './PdfViewer'; // Importa tu visor PDF


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
         {/* Visor PDF dentro de un div contenedor */}
          <div className="pdf-viewer-container">
            <PdfViewer fileUrl={document.archivo_url} />
          </div>
      </div>
    </div>
  </div>

  );
};

export default InteractiveBook;
