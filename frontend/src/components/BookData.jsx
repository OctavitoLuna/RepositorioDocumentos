// BookData.jsx
import React, { useState, useEffect } from 'react';
import PdfViewer from './PdfViewer'; // Componente visor PDF
import ShareTwitter from './ShareTwitter'; // Botón compartir Twitter
import ShareWhatsApp from './ShareWhatsApp'; // Botón compartir WhatsApp
import DocumentComments from './DocumentComments'; // Comentarios del documento

const BookData = ({ document, onClose, userRole }) => {
  if (!document) return null;

  // Estados para edición solo si admin
  const [editData, setEditData] = useState({
    titulo: document.titulo || '',
    autor: document.autor || '',
    tipo: document.tipo || '',
    categoria: document.categoria || '',
    descripcion: document.descripcion || '',
    archivo_url: document.archivo_url || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Sincronizar estado cuando cambia documento
  useEffect(() => {
    setEditData({
      titulo: document.titulo || '',
      autor: document.autor || '',
      tipo: document.tipo || '',
      categoria: document.categoria || '',
      descripcion: document.descripcion || '',
      archivo_url: document.archivo_url || '',
    });
    setError(null);
    setSuccess(null);
  }, [document]);

  // Handler para inputs editables
  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Guardar cambios en backend
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`http://localhost:3001/documents/${document._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Error actualizando documento');
      }
      setSuccess('Documento actualizado correctamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="book-data-overlay">
      <div
        className="book-data-content"
        style={{ maxWidth: '900px', width: '90%', margin: 'auto', overflowX: 'hidden' }}
      >
        <button className="close-button" onClick={onClose} aria-label="Cerrar">
          X
        </button>

        {userRole === 'admin' ? (
          <>
            <label><strong>Título:</strong></label>
            <input
              name="titulo"
              value={editData.titulo}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />

            <label><strong>Autor:</strong></label>
            <input
              name="autor"
              value={editData.autor}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />

            <label><strong>Tipo:</strong></label>
            <input
              name="tipo"
              value={editData.tipo}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />

            <label><strong>Categoría:</strong></label>
            <input
              name="categoria"
              value={editData.categoria}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />

            <label><strong>Descripción:</strong></label>
            <textarea
              name="descripcion"
              value={editData.descripcion}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />

            <label><strong>URL Archivo PDF:</strong></label>
            <input
              name="archivo_url"
              value={editData.archivo_url}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '10px 20px',
                backgroundColor: saving ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: saving ? 'not-allowed' : 'pointer',
                marginTop: '10px',
              }}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
          </>
        ) : (
          <>
            <h2>{document.titulo}</h2>
            <p><strong>Autor:</strong> {document.autor}</p>
            <p><strong>Tipo:</strong> {document.tipo}</p>
            <p><strong>Categoría:</strong> {document.categoria}</p>
            <p><strong>Descripción:</strong> {document.descripcion}</p>

            <div className="pdf-viewer-wrapper">
              <PdfViewer fileUrl={document.archivo_url} />
            </div>

            <div style={{ marginTop: '10px' }}>
              <ShareWhatsApp
                title={document.titulo}
                categoria={document.categoria}
                descripcion={document.descripcion}
                autor={document.autor}
              />
              <ShareTwitter
                title={document.titulo}
                categoria={document.categoria}
                descripcion={document.descripcion}
                autor={document.autor}
              />
            </div>

            <DocumentComments documentoId={document._id} />
          </>
        )}
      </div>
    </div>
  );
};

export default BookData;
