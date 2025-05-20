import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksPanel.css';
import BookData from './BookData'; // Importa el nuevo componente

const bookImagePath = '/home/book.png';

const BooksPanel = () => {
  const [documents, setDocuments] = useState([]);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null); // Nuevo estado

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  const itemsPerPage = rows * columns;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = documents.slice(startIndex, endIndex);

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

  // Abrir BookData con documento clickeado
  const handleBookClick = (document) => {
    setSelectedDocument(document);
  };

  // Cerrar BookData
  const handleCloseBookData = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="books-panel">
      <div className="books-container">
        {currentDocuments.map((document) => (
          <div
            className="book-item"
            key={document._id}
            onClick={() => handleBookClick(document)} // click para abrir BookData
            style={{ cursor: 'pointer' }}
          >
            <div className="book-image-container">
              <img src={bookImagePath} alt={document.titulo} />
              <div className="overlay-text">
                <h3>{document.titulo}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-button left"
        onClick={goToPrevPage}
        disabled={currentPage === 0}
      >
        ◀
      </button>
      <button
        className="carousel-button right"
        onClick={goToNextPage}
        disabled={(currentPage + 1) * itemsPerPage >= documents.length}
      >
        ▶
      </button>

      {/* Mostrar BookData si hay documento seleccionado */}
      {selectedDocument && (
        <BookData document={selectedDocument} onClose={handleCloseBookData} />
      )}
    </div>
  );
};

export default BooksPanel;
