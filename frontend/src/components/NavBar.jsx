import { Link } from 'react-router-dom';
import './NavBar.css'; // Puedes crear este archivo para estilos opcionales

export default function NavBar() {
  return (
    <nav className="navbar">
      
    <div class="background"></div> 
      <ul>
      <li><Link to="/aboutus">NOSOTROS</Link></li>

        <li><Link to="/forum">FOROS</Link></li>
        <li><Link to="/">INICIO</Link></li>
        <li><Link to="/biblio">BIBLIOTECA</Link></li>
        <li><Link to="/contact">CONTACTO</Link></li>

      </ul>
    </nav>

  );
}
/*<li><Link to="/mycollection">Mi Colección</Link></li>
<li><Link to="/biblio-manager">Gestión de Biblioteca</Link></li>
<li><Link to="/user-manager">Gestión de Usuarios</Link></li>
<li><Link to="/forum-manager">Gestión de Foro</Link></li>
<li><Link to="/add-content">Añadir Contenido</Link></li>
<li><Link to="/historical-events">Eventos Históricos</Link></li>*/