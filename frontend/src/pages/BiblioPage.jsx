import React, { useState, useEffect } from 'react';
import BusquedaLibros from '../components/BusquedaLibros';
import FiltroLibro from '../components/FiltroLibro';
import ContenidoCategoria from '../components/ContenidoCategoria';
import BookData from '../components/BookData';
// import ModalDetalleLibro from '../components/ModalDetalleLibro';
// import CollectionsModal from '../components/collection/CollectionsModal';
import DocumentForm from '../components/DocumentForm';

const BibliotecaPage = () => {
  const [resultados, setResultados] = useState([]);
  const [filtro, setFiltro] = useState('titulo');
  const [showDocumentForm, setShowDocumentForm] = useState(false);

  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [showBookData, setShowBookData] = useState(false);

  const [userRole, setUserRole] = useState('visitante'); // valor por defecto
  const [usuarioResponsableId, setUsuarioResponsableId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.rol || 'visitante');
        setUsuarioResponsableId(user._id || null);
      } catch {
        setUserRole('visitante');
        setUsuarioResponsableId(null);
      }
    }
  }, []);

  const obtenerTodosDocumentos = async () => {
    try {
      const response = await fetch('http://localhost:3001/documents');
      if (!response.ok) throw new Error('Error obteniendo documentos');
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error(error);
      setResultados([]);
    }
  };

  useEffect(() => {
    obtenerTodosDocumentos();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      obtenerTodosDocumentos();
      return;
    }

    let query = '';
    if (filtro === 'titulo') {
      query = `titulo=${encodeURIComponent(searchTerm)}`;
    } else if (filtro === 'autor') {
      query = `autor=${encodeURIComponent(searchTerm)}`;
    }

    try {
      const response = await fetch(`http://localhost:3001/documents/search?${query}`);
      if (!response.ok) throw new Error('Error en la búsqueda');
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error(error);
      setResultados([]);
    }
  };

  const handleSelectBook = (book) => {
    setDocumentoSeleccionado(book);
    setShowBookData(true);
  };

  const handleCloseBookData = () => {
    setShowBookData(false);
    setDocumentoSeleccionado(null);
  };

  // Función para actualizar lista y cerrar formulario tras crear documento
  const handleDocumentCreated = (nuevoDocumento) => {
    obtenerTodosDocumentos();
    setShowDocumentForm(false);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FiltroLibro onFilterChange={setFiltro} />
          <BusquedaLibros onSearch={handleSearch} />

          {/* Botón "+" visible solo para admin */}
          {userRole === 'admin' && (
            <button
              onClick={() => setShowDocumentForm(true)}
              style={{
                backgroundColor: '#4b6e35',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '28px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: '15px',
                lineHeight: '36px',
                userSelect: 'none',
              }}
              title="Agregar documento"
              aria-label="Agregar documento"
            >
              +
            </button>
          )}
        </div>

        {resultados.length === 0 ? (
          <p style={styles.noResultsText}>No hay documentos para mostrar.</p>
        ) : (
          <ContenidoCategoria documentos={resultados} onDocumentoClick={handleSelectBook} />
        )}

        {showBookData && documentoSeleccionado && (
          <BookData
            document={documentoSeleccionado}
            onClose={handleCloseBookData}
            userRole={userRole} // pasar rol a BookData
          />
        )}

        {/* Modal formulario para agregar documento */}
        {showDocumentForm && (
          <DocumentForm
            usuarioResponsableId={usuarioResponsableId}
            onSubmit={handleDocumentCreated}
          />
        )}

        {/* Comentados para evitar que aparezcan */}
        {/* <ModalDetalleLibro
          documento={documentoSeleccionado}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        /> */}

        {/* <CollectionsModal
          visible={showCollectionsModal}
          onClose={() => setShowCollectionsModal(false)}
          usuarioId={'68150275b0a432b34c21344d'}
          onSelectDocument={handleSelectBook}
        /> */}
      </div>
    </div>
  );
};

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
    flexDirection: 'column',
    gap: '1.5rem',
  },
  noResultsText: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
};

export default BibliotecaPage;
