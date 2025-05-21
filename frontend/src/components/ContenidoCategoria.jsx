import React from 'react';

const contenedorEstilos = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const documentoEstilos = {
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '10px',
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
          onClick={() => onDocumentoClick ? onDocumentoClick(doc) : null}
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
