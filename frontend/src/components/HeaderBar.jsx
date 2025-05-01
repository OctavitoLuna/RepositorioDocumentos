import './HeaderBar.css';

export default function HeaderBar() {
  const baseHeight = 70; // Altura base en px (ajustable)

  return (
    <header className="header-bar" style={{ height: `${baseHeight}px` }}>
      {/* Fondo delgado lateral izquierdo */}
      <div className="side-strip left-strip"></div>

      {/* Ícono izquierdo */}
      <img
        src="/global/theme.png"
        alt="Theme Icon"
        className="icon left-icon"
        onClick={() => console.log('Icono izquierdo clickeado')}
      />

      {/* Título centrado con barra */}
      <div className="center-bar">
        <h1 className="header-title">Repositorio de Documentos Históricos</h1>
      </div>

      {/* Ícono derecho */}
      <img
        src="/global/login.png"
        alt="Login Icon"
        className="icon right-icon"
        onClick={() => console.log('Icono derecho clickeado')}
      />

      {/* Fondo delgado lateral derecho */}
      <div className="side-strip right-strip"></div>
    </header>
  );
}
