import React, { useState, useEffect } from 'react';
import AddCollectionForm from './AddCollectionForm';
import CollectionDetail from './CollectionDetail';

export default function CollectionsModal({ visible, onClose, usuarioId, onSelectDocument }) {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch colecciones del usuario
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/collections/user/${usuarioId}`);
      if (!res.ok) throw new Error('Error cargando colecciones');
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      setError('Error cargando colecciones');
      setLoading(false);
    }
  };

  // Fetch colección con documentos populados
  const fetchCollectionById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/collections/${id}`);
      if (!res.ok) throw new Error('Error obteniendo colección');
      const data = await res.json();
      setSelectedCollection(data);
    } catch {
      alert('Error obteniendo colección');
    }
  };

  useEffect(() => {
    if (visible && usuarioId) {
      fetchCollections();
      setSelectedCollection(null);
    }
  }, [visible, usuarioId]);

  const handleCreateCollection = async ({ nombre, descripcion }) => {
    try {
      const res = await fetch('http://localhost:3001/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion, usuario_creador: usuarioId, documentos: [] }),
      });
      if (!res.ok) throw new Error('Error creando colección');
      fetchCollections();
    } catch {
      alert('Error creando colección');
    }
  };

  const handleDeleteCollection = async (id) => {
    if (!window.confirm('¿Eliminar colección?')) return;
    try {
      const res = await fetch(`http://localhost:3001/collections/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error eliminando colección');
      setSelectedCollection(null);
      fetchCollections();
    } catch {
      alert('Error eliminando colección');
    }
  };

  // POST agregar documento y luego fetch colección completa
  const handleAddDocumentToCollection = async (docId) => {
    try {
      const res = await fetch(`http://localhost:3001/collections/${selectedCollection._id}/documentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentoId: docId }),
      });
      if (!res.ok) throw new Error('Error agregando documento');
      // Hacer fetch para obtener colección con documentos populados
      await fetchCollectionById(selectedCollection._id);
      fetchCollections();
    } catch {
      alert('Error agregando documento');
    }
  };

  // DELETE eliminar documento y luego fetch colección completa
  const handleRemoveDocumentFromCollection = async (docId) => {
    if (!window.confirm('¿Eliminar documento de la colección?')) return;
    try {
      const res = await fetch(`http://localhost:3001/collections/${selectedCollection._id}/documentos/${docId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error eliminando documento');
      await fetchCollectionById(selectedCollection._id);
      fetchCollections();
    } catch {
      alert('Error eliminando documento');
    }
  };

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
        <h2>Tus colecciones</h2>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            {loading && <p>Cargando colecciones...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul style={{
              listStyle: 'none',
              padding: 0,
              maxHeight: '350px',
              overflowY: 'auto',
              fontSize: '18px',
              fontWeight: '600',
            }}>
              {collections.map(col => (
                <li
                  key={col._id}
                  onClick={() => setSelectedCollection(col)}
                  style={{
                    padding: '12px 15px',
                    cursor: 'pointer',
                    backgroundColor: selectedCollection?._id === col._id ? '#ddd' : 'transparent',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{col.nombre}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCollection(col._id);
                    }}
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      fontWeight: 'bold',
                      fontSize: '20px'
                    }}
                    title="Eliminar colección"
                  >
                    ✖
                  </button>
                </li>
              ))}
              {collections.length === 0 && <li>No tienes colecciones</li>}
            </ul>

            <AddCollectionForm onCreate={handleCreateCollection} />
          </div>

          <div style={{ flex: 2 }}>
            <CollectionDetail
              collection={selectedCollection}
              onRemoveDocument={handleRemoveDocumentFromCollection}
              onAddDocument={handleAddDocumentToCollection}
              onSelectDocument={onSelectDocument}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '1000px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '30px 40px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  closeButton: {
    backgroundColor: '#D46D1E',
    color: '#fff',
    border: 'none',
    padding: '12px 25px',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '25px',
  },
};
