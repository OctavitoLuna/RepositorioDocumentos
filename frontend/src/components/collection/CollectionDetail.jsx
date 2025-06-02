import React, { useState } from 'react';
import AddDocumentToCollection from './AddDocumentToCollection';

export default function CollectionDetail({ collection, onRemoveDocument, onAddDocument, onSelectDocument }) {
  const [showAddDocument, setShowAddDocument] = useState(false);

  if (!collection) return <p>Selecciona una colección para ver detalles</p>;

  return (
    <div>
      <h3>Documentos en "{collection.nombre}"</h3>
      <ul style={{ listStyle: 'none', padding: 0, maxHeight: '250px', overflowY: 'auto' }}>
        {collection.documentos?.map(doc => (
          <li
            key={doc._id}
            style={{ padding: '6px', borderBottom: '1px solid #ccc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span onClick={() => onSelectDocument(doc)}>{doc.titulo}</span>
            <button
              onClick={() => onRemoveDocument(doc._id)}
              style={{
                marginLeft: '10px',
                color: 'red',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                lineHeight: '1',
              }}
              title="Eliminar documento"
            >
              ✖
            </button>
          </li>
        ))}
        {collection.documentos?.length === 0 && <li>No hay documentos</li>}
      </ul>

      {showAddDocument ? (
        <AddDocumentToCollection
          collection={collection}
          onAdd={onAddDocument}
          onClose={() => setShowAddDocument(false)}
        />
      ) : (
        <button
          onClick={() => setShowAddDocument(true)}
          style={{
            marginTop: '8px',
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: '#D46D1E',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
          }}
        >
          Agregar documento
        </button>
      )}
    </div>
  );
}
