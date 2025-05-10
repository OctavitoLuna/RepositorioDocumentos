import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksPanel.css'; // Asegúrate de tener este import para el CSS modular
const bookImagePath = '/home/book.png'; // Ruta relativa desde public

const BooksPanel = () => {
  const [documents, setDocuments] = useState([]);
  const [rows, setRows] = useState(3); 
  const [columns, setColumns] = useState(4); 
  const [currentPage, setCurrentPage] = useState(0); 

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

  return (
        <div className="books-panel">
      <div className="books-container">
        {currentDocuments.map((document) => (
          <div className="book-item" key={document._id}>
            <div className="book-image-container">
              <img src={bookImagePath} alt={document.titulo} />
              <div className="overlay-text">
                <h3>{document.titulo}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones tipo carrusel */}
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
    </div>

  );
};

export default BooksPanel;
