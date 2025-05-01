import { Link } from 'react-router-dom';
import './NavBar.css'; // Puedes crear este archivo para estilos opcionales

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/biblio">Biblioteca</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/forum">Foro</Link></li>
        <li><Link to="/aboutus">Sobre Nosotros</Link></li>
        <li><Link to="/mycollection">Mi Colección</Link></li>
        <li><Link to="/biblio-manager">Gestión de Biblioteca</Link></li>
        <li><Link to="/user-manager">Gestión de Usuarios</Link></li>
        <li><Link to="/forum-manager">Gestión de Foro</Link></li>
        <li><Link to="/add-content">Añadir Contenido</Link></li>
        <li><Link to="/historical-events">Eventos Históricos</Link></li>
      </ul>
    </nav>
  );
}
