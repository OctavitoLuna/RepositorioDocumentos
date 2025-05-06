import { useState } from "react";
import "./ForumPage.css"; // Importamos el CSS específico

export default function ForumInterface() {
  const [searchTerm, setSearchTerm] = useState("busquedaForos");
  
  return (
    <div className="forum-container">
      {/* Barra de búsqueda */}
      <div className="search-bar-container">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <button className="menu-button">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <button className="sidebar-button">EXPLORAR</button>
            <button className="sidebar-button">MIS FOROS</button>
            <button className="sidebar-button">TODOS</button>
          </div>
          
          {/* Panel principal */}
          <div className="main-panel">
            <h2 className="panel-title">panelForos</h2>
            
            {/* Número en la esquina */}
            <div className="number-indicator">4</div>
          </div>
        </div>
      </div>
    </div>
  );
}