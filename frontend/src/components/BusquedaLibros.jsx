import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const BusquedaLibros = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar libros..."
        className="search-input"
      />
      <button onClick={handleSearchSubmit} className="search-button">
        <FaSearch /> {/* Icono de lupa */}
      </button>
      <style jsx>{`
        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          margin-bottom: 20px;
        }

        .search-input {
          width: 70%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .search-button {
          padding: 10px;
          margin-left: 10px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .search-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default BusquedaLibros;
