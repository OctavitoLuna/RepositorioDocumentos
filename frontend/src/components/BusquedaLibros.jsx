import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const BusquedaLibros = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
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
          margin-bottom: 20px;
          gap: 1vh;
          margin-left: auto;
          margin-right: auto;
          width: 50%;
        }
        .search-input {
          flex-grow: 1;
          padding: 12px 15px;
          border-radius: 25px;
          border: 1px solid #ccc;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        .search-input:focus {
          outline: none;
          border-color:rgb(59, 50, 44);
          box-shadow: 0 0 8px rgba(75, 64, 62, 0.5);
        }
        .search-button {
          padding: 12px 18px;
          background-color:rgb(56, 54, 51);
          color: white;
          border: none;
          border-radius: 5vh;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: background-color 0.3s ease;
        }
        .search-button:hover {
          background-color:rgb(80, 79, 64);
        }
      `}</style>

    </div>
  );
};

export default BusquedaLibros;
