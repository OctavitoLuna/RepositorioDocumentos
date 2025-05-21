import React, { useState, useEffect } from 'react';
import BusquedaLibros from '../components/BusquedaLibros';
import FiltroLibro from '../components/FiltroLibro';
import ContenidoCategoria from '../components/ContenidoCategoria';
import ModalDetalleLibro from '../components/ModalDetalleLibro';

const BibliotecaPage = () => {
  const [resultados, setResultados] = useState([]);
  const [filtro, setFiltro] = useState('titulo'); // Por defecto solo título

  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setDocumentoSeleccionado(null);
  };

  return (
    <div style={styles.pageContainer}>
      
      <div style={styles.contentWrapper}>
        
        <FiltroLibro onFilterChange={setFiltro} />
        <BusquedaLibros onSearch={handleSearch} />
        {resultados.length === 0 ? (
          <p style={styles.noResultsText}>No hay documentos para mostrar.</p>
        ) : (
          <ContenidoCategoria documentos={resultados} onDocumentoClick={handleSelectBook} />
        )}
        <ModalDetalleLibro
          documento={documentoSeleccionado}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
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
