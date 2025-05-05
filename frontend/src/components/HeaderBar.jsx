import './HeaderBar.css';

export default function HeaderBar() {
  const baseHeight = 120; // Altura base en px (ajustable)

  return (
    <header className="header-bar" style={{ height: `${baseHeight}px` }}>
      {/* Fondo delgado lateral izquierdo */}
      <div className="side-strip left-strip"></div>

      {/* Ícono izquierdo con fondo opaco */}
      <div className="icon left-icon">
        <div className="background"></div> {/* Fondo con opacidad */}
        <img
          src="/global/theme.png"
          alt="Theme Icon"
          onClick={() => console.log('Icono izquierdo clickeado')}
        />
      </div>

      {/* Título centrado con barra */}
      <div className="center-bar">
        <h1 className="header-title">Repositorio de Documentos Históricos</h1>
      </div>

      {/* Ícono derecho con fondo opaco */}
      <div className="icon right-icon">
        <div className="background"></div> {/* Fondo con opacidad */}
        <img
          src="/global/login.png"
          alt="Login Icon"
          onClick={() => console.log('Icono derecho clickeado')}
        />
      </div>

      {/* Fondo delgado lateral derecho */}
      <div className="side-strip right-strip"></div>
    </header>
  );
}
