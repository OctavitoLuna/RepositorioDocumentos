import React, { useState, useEffect } from "react";
import "./ForumPage.css"; // estilos globales
import Sidebar from '../components/foro/Sidebar';
import BooksView from '../components/foro/BooksView';
import CategoryForumModal from '../components/foro/CategoryForumModal';

export default function ForumPage() {
  const [selectedTab, setSelectedTab] = useState("categorias");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Para abrir modal

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:3001/forums/categories");
        if (!res.ok) throw new Error("Error cargando categorías");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <Sidebar activeTab={selectedTab} setActiveTab={setSelectedTab} />
        <main style={styles.mainContent}>
          {selectedTab === "categorias" && (
            <>
              <h2>Categorías</h2>
              <div style={styles.categoryButtonsContainer}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    style={{
                      ...styles.categoryButton,
                      backgroundColor: selectedCategory === cat ? '#D46D1E' : '#222'
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Modal para comentarios */}
              {selectedCategory && (
                <CategoryForumModal
                  categoria={selectedCategory}
                  onClose={() => setSelectedCategory(null)}
                  userId={null}
                />
              )}
            </>
          )}

{selectedTab === "libros" && (
  <>
    <h2>Libros</h2>
    <a 
      href="http://localhost:5173/biblio" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        marginTop: '20px',
        fontSize: '18px',
        color: '#D46D1E',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      Ir a la biblioteca
    </a>
  </>
)}
        </main>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    marginTop: '11vw',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    minHeight: '100vh',
    paddingBottom: '2rem',
  },
  contentWrapper: {
    width: '80%',
    backgroundColor: '#fff',
    border: '30px solid #131313',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    gap: '20px',
  },
  mainContent: {
    flexGrow: 1,
    padding: '10px 20px',
    overflowY: 'auto',
    borderRadius: '0 15px 15px 0',
    backgroundColor: '#f5f5f5',
  },
  categoryButtonsContainer: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: '14px 25px',
    backgroundColor: '#222',
    color: 'white',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 0 10px #000 inset',
    whiteSpace: 'nowrap',
  },
};
