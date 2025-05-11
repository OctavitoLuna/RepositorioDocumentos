import React from 'react';

const LibrosCategoria = ({ book, onSelectBook }) => {
  return (
    <div className="book-card" onClick={() => onSelectBook(book)}>
      <img src={book.image} alt={book.title} className="book-image" />
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      <style jsx>{`
        .book-card {
          width: 200px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .book-card:hover {
          transform: scale(1.05);
        }

        .book-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .book-card h3 {
          font-size: 1.2rem;
          margin: 10px 0;
        }

        .book-card p {
          font-size: 1rem;
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default LibrosCategoria;
