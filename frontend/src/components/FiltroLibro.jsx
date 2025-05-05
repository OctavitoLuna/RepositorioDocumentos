import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa'; // Icono de filtro de FontAwesome

const FiltroLibro = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilterMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filter) => {
    onFilter(filter);
    setIsOpen(false); // Cierra el menú después de seleccionar un filtro
  };

  return (
    <div className="filter-container">
      <button onClick={toggleFilterMenu} className="filter-button">
        <FaFilter /> {/* Icono de filtro */}
      </button>
      {isOpen && (
        <ul className="filter-list">
          <li onClick={() => handleFilterSelect('title')}>Nombre</li>
          <li onClick={() => handleFilterSelect('author')}>Autor</li>
          <li onClick={() => handleFilterSelect('category')}>Categoría</li>
        </ul>
      )}

      <style jsx>{`
        .filter-container {
          position: relative;
        }

        .filter-button {
          padding: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .filter-button:hover {
          background-color: #218838;
        }

        .filter-list {
          list-style: none;
          padding: 10px;
          position: absolute;
          top: 100%;
          left: 0;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 150px;
        }

        .filter-list li {
          padding: 8px;
          cursor: pointer;
        }

        .filter-list li:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default FiltroLibro;
