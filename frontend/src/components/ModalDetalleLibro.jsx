import React from 'react';

const ModalDetalleLibro = ({ book, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{book.title}</h2>
        <p><strong>Autor:</strong> {book.author}</p>
        <p><strong>Fecha:</strong> {book.date}</p>
        <p><strong>Categoría:</strong> {book.category}</p>
        <p><strong>Descripción:</strong> {book.description}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 500px;
          width: 100%;
        }

        button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ModalDetalleLibro;
