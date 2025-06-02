import React, { useState, useEffect } from 'react';

export default function DocumentRating({ documentId, userId }) {
  const [ratingData, setRatingData] = useState({ average: 0, count: 0, userRating: null });
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar resumen y voto del usuario
  useEffect(() => {
    if (!documentId) return;

    const fetchRatings = async () => {
      setLoading(true);
      try {
        // Obtener resumen general
        const summaryRes = await fetch(`http://localhost:3001/documents/${documentId}/rating-summary`);
        if (!summaryRes.ok) throw new Error('Error al cargar resumen');
        const summary = await summaryRes.json();

        let userRating = null;
        if (userId) {
          try {
            // Intentar obtener voto del usuario si backend soporta (opcional)
            const userRes = await fetch(`http://localhost:3001/documents/${documentId}/rating/${userId}`);
            if (userRes.ok) {
              const userData = await userRes.json();
              userRating = userData.valor || null;
            }
          } catch {
            userRating = null; // en caso de error silencioso
          }
        }

        setRatingData({
          average: summary.average || 0,
          count: summary.count || 0,
          userRating,
        });
        setUserVote(userRating);
      } catch (error) {
        console.error('Error fetching rating data', error);
      }
      setLoading(false);
    };

    fetchRatings();
  }, [documentId, userId]);

  const handleVote = async (value) => {
    if (!userId) {
      alert('Debes estar logueado para votar');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/documents/${documentId}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: userId, valor: value }),
      });
      if (!res.ok) throw new Error('Error enviando voto');
      const updated = await res.json();

      // Actualizar estado local con la respuesta del backend
      setUserVote(value);
      setRatingData({
        average: updated.average || ratingData.average,
        count: updated.count || ratingData.count,
        userRating: value,
      });
    } catch (error) {
      alert('Error enviando voto');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>Calificación</h4>
      <p>
        Promedio: {ratingData.average.toFixed(1)} ({ratingData.count} voto{ratingData.count !== 1 ? 's' : ''})
      </p>

      {userId ? (
        <div>
          <p>Tu voto:</p>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => !loading && handleVote(n)}
              disabled={loading}
              style={{
                fontWeight: userVote === n ? 'bold' : 'normal',
                color: userVote === n ? '#D46D1E' : '#000',
                marginRight: '5px',
                cursor: 'pointer',
              }}
              aria-label={`Votar ${n} estrellas`}
            >
              {n} ★
            </button>
          ))}
        </div>
      ) : (
        <p>Inicia sesión para votar.</p>
      )}
    </div>
  );
}
