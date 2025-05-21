import React from 'react';

const contenedorEstilos = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // máximo 3 columnas con mínimo 300px
  gap: '20px',
};

const documentoEstilos = {
  backgroundColor: '#f5f5f5', // fondo claro que resalta
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

export default function ContenidoCategoria({ documentos, onDocumentoClick }) {
  if (!documentos || documentos.length === 0) {
    return <p>No hay documentos para mostrar.</p>;
  }

  return (
    <div style={contenedorEstilos}>
      {documentos.map(doc => (
        <div
          key={doc._id}
          style={documentoEstilos}
          onClick={() => onDocumentoClick && onDocumentoClick(doc)}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h3>{doc.titulo}</h3>
          <p><strong>Autor:</strong> {doc.autor}</p>
          <p><strong>Tipo:</strong> {doc.tipo || 'N/A'}</p>
          <p><strong>Categoría:</strong> {doc.categoria || 'N/A'}</p>
          <p><strong>Fecha subida:</strong> {doc.fecha_subida ? new Date(doc.fecha_subida).toLocaleDateString() : 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}
