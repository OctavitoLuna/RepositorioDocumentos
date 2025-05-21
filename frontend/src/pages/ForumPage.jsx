import { useState } from "react";
import "./ForumPage.css";

export default function ForumInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foros, setForos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener todos los foros
  const obtenerTodosForos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/api/foros");
      if (!res.ok) throw new Error("Error al obtener todos los foros");
      const data = await res.json();
      setForos(data);
    } catch (err) {
      setError(err.message);
      setForos([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para buscar foros por categoría
  const buscarForosPorCategoria = async () => {
    if (!searchTerm.trim()) {
      setForos([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:3001/api/foros/categoria/${encodeURIComponent(searchTerm)}`
      );
      if (!res.ok) throw new Error("Error al buscar foros por categoría");
      const data = await res.json();
      setForos(data);
    } catch (err) {
      setError(err.message);
      setForos([]);
    } finally {
      setLoading(false);
    }
  };

  // Manejar tecla Enter en el input para buscar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      buscarForosPorCategoria();
    }
  };

  return (
    <div className="forum-container">
      {/* Barra de búsqueda */}
      <div className="search-bar-container">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            placeholder="Buscar por categoría..."
          />
          <button className="search-icon" onClick={buscarForosPorCategoria} title="Buscar">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <button className="menu-button">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Contenedor con margen negro transparente */}
      <div className="outer-container">
        {/* Contenedor principal con el panel de foro */}
        <div className="forum-panel-container">
          {/* Barra lateral con botones */}
          <div className="sidebar">
            <button className="sidebar-button" onClick={obtenerTodosForos}>
              EXPLORAR
            </button>
            <button className="sidebar-button">MIS FOROS</button>
            <button className="sidebar-button" onClick={obtenerTodosForos}>
              TODOS
            </button>
          </div>

          {/* Panel principal */}
          <div className="main-panel">
            <h2 className="panel-title"></h2>

            {loading && <p>Cargando foros...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && foros.length === 0 && <p>No se encontraron foros.</p>}

            <div className="foros-container">
              {foros.map((foro) => (
                <div key={foro._id} className="foro-card">
                  <h3 className="foro-nombre">{foro.nombre}</h3>
                  <p className="foro-categoria">Categoría: {foro.categoria}</p>
                  {/* Puedes añadir más info aquí, como fecha, autor, etc. */}
                </div>
              ))}
           </div>

            {/* Número en la esquina, actualizado dinámicamente */}
            <div className="number-indicator">{foros.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
