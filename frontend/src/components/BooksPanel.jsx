import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Ruta de la imagen del libro
const bookImagePath = '/home/book.png'; // Ruta relativa desde public

const BooksPanel = () => {
  const [documents, setDocuments] = useState([]);
  const [rows, setRows] = useState(3); // Número de filas por página
  const [columns, setColumns] = useState(4); // Número de columnas por página
  const [currentPage, setCurrentPage] = useState(0); // Página actual

  // Fetch documents from backend when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setDocuments(response.data); // Guardar los documentos obtenidos
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  // Número total de elementos por página
  const itemsPerPage = rows * columns;

  // Calcular los índices de inicio y fin para la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = documents.slice(startIndex, endIndex);

  // Función para manejar el cambio de página
  const goToNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < documents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="books-panel">
      {/* Crear un contenedor que ocupe todo el ancho de la pantalla */}
      <div className="books-container">
        {currentDocuments.map((document) => (
          <div className="book-item" key={document._id}>
            {/* Mostrar la imagen de cada libro */}
            <img src={bookImagePath} alt={document.titulo} />
            {/* Mostrar el título del libro */}
            <h3>{document.titulo}</h3>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="pagination-controls">
        <button onClick={goToPrevPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <button onClick={goToNextPage} disabled={(currentPage + 1) * itemsPerPage >= documents.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default BooksPanel;