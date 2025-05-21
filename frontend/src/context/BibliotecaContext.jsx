import React, { createContext, useState, useEffect } from 'react';

export const BibliotecaContext = createContext();

export const BibliotecaProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);
  const [filtro, setFiltro] = useState('ambos');
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para obtener todos los documentos
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

  // Cargar todos los documentos al montar el provider
  useEffect(() => {
    obtenerTodosDocumentos();
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      obtenerTodosDocumentos();
      return;
    }

    let query = '';
    if (filtro === 'ambos') {
      query = `titulo=${encodeURIComponent(searchTerm)}&autor=${encodeURIComponent(searchTerm)}`;
    } else if (filtro === 'titulo') {
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

  return (
    <BibliotecaContext.Provider
      value={{
        resultados,
        filtro,
        setFiltro,
        documentoSeleccionado,
        setDocumentoSeleccionado,
        modalVisible,
        setModalVisible,
        handleSearch,
      }}
    >
      {children}
    </BibliotecaContext.Provider>
  );
};
