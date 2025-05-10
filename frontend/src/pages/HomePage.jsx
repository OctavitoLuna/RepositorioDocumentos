import React, { useState, useEffect } from 'react';
import BooksPanel from '../components/BooksPanel'; // Importa BooksPanel
import InteractiveBook from '../components/InteractiveBook'; // Importa InteractiveBook
import axios from 'axios';

export default function HomePage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents'); // URL del backend
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  // Selecciona aleatoriamente 4 documentos
  const randomDocuments = documents
    .sort(() => Math.random() - 0.5) // Mezcla los documentos aleatoriamente
    .slice(0, 4); // Toma los primeros 4 documentos


    
  return (
    <div>
      {/* BooksPanel sigue estando aquí */}
      <BooksPanel />
      
      {/* Aquí agregamos InteractiveBook intercalado */}
      <div className="interactive-books-panel">
        {randomDocuments.map((document, index) => (
          <InteractiveBook
            key={document._id}
            document={document}
            position={index % 2 === 0 ? 'left' : 'right'} // Alterna entre izquierda y derecha
          />
        ))}
      </div>
    </div>
  );
}
