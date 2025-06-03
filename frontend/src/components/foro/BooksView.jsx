import React, { useEffect, useState } from "react";

export default function BooksView() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/documents")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {books.map((book) => (
        <div
          key={book._id}
          style={{
            backgroundColor: "#222",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "150px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          onClick={() => alert(`Mostrar detalles del libro: ${book.titulo} (pendiente)`)}
        >
          {book.categoria || "Sin categoría"}
        </div>
      ))}
    </div>
  );
}
