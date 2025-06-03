import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const styles = {
    container: {
      width: "140px",
      backgroundColor: "#222",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      padding: "20px",
      borderRadius: "15px 0 0 15px",
      color: "white",
      height: "100%",
    },
    button: (active) => ({
      backgroundColor: active ? "#444" : "transparent",
      border: "none",
      color: "white",
      fontSize: "16px",
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    }),
  };

  return (
    <nav style={styles.container}>
      <button
        style={styles.button(activeTab === "categorias")}
        onClick={() => setActiveTab("categorias")}
      >
        Categorías
      </button>
      <button
        style={styles.button(activeTab === "libros")}
        onClick={() => setActiveTab("libros")}
      >
        Libros
      </button>
    </nav>
  );
}
