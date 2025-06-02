import React, { useState, useEffect } from 'react';

export default function AddDocumentToCollection({ collection, onAdd, onClose }) {
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:3001/documents');
      const data = await res.json();
      // Filtra documentos que no están en la colección
      const filtered = data.filter(doc => !collection.documentos.some(d => d._id === doc._id));
      setAvailableDocuments(filtered);
    } catch {
      // ignore
    }
  };

  const handleAdd = () => {
    if (!selectedDocId) return alert('Selecciona un documento');
    onAdd(selectedDocId);
    onClose();
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <select
        value={selectedDocId}
        onChange={e => setSelectedDocId(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      >
        <option value="">-- Selecciona documento --</option>
        {availableDocuments.map(doc => (
          <option key={doc._id} value={doc._id}>{doc.titulo}</option>
        ))}
      </select>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handleAdd}
          style={{
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: '#D46D1E',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            marginRight: '10px',
          }}
        >
          Agregar
        </button>
        <button
          onClick={onClose}
          style={{
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: '#999',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
