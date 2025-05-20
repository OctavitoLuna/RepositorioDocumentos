// BookData.jsx
import React from 'react';
import PdfViewer from './PdfViewer'; // Importa tu componente PdfViewer

const BookData = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className="book-data-overlay">
      <div className="book-data-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{document.titulo}</h2>
        <p><strong>Autor:</strong> {document.autor}</p>
        <p><strong>Tipo:</strong> {document.tipo}</p>
        <p><strong>Categoría:</strong> {document.categoria}</p>
        <p><strong>Descripción:</strong> {document.descripcion}</p>

        {/* Contenedor para el visor PDF */}
        <div className="pdf-viewer-wrapper">
          <PdfViewer fileUrl={document.archivo_url} />
        </div>
      </div>
    </div>
  );
};

export default BookData;
