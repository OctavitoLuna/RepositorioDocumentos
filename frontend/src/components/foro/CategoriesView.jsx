import React, { useEffect, useState } from "react";

export default function CategoriesView() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/forums/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          style={{
            padding: "15px 25px",
            backgroundColor: "#222",
            color: "white",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          onClick={() => alert(`Mostrar comentarios de la categoría: ${cat} (pendiente)`)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
