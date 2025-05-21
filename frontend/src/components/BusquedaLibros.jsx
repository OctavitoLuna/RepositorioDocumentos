import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const BusquedaLibros = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Llamamos a onSearch con el texto (aunque esté vacío)
    onSearch(searchTerm.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar libros..."
        className="search-input"
      />
      <button
        onClick={handleSearchSubmit}
        className="search-button"
      >
        <FaSearch />
      </button>

      <style jsx>{`
        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          margin-bottom: 20px;
          gap: 10px;
        }
        .search-input {
          width: 70%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .search-button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .search-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default BusquedaLibros;
