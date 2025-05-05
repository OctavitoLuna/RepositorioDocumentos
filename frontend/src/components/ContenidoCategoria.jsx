import React from 'react';
import LibrosCategoria from './LibrosCategoria';

const ContenidoCategoria = ({ books, onSelectBook }) => {
  return (
    <div className="content-container">
      <h2>Libros</h2>
      <div className="books-list">
        {books.map((book, index) => (
          <LibrosCategoria key={index} book={book} onSelectBook={onSelectBook} />
        ))}
      </div>

      <style jsx>{`
        .content-container {
          padding: 20px;
        }

        .books-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }
      `}</style>
    </div>
  );
};

export default ContenidoCategoria;
