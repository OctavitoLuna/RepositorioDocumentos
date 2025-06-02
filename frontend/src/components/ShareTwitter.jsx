import React from 'react';

export default function ShareTwitter({ title, categoria, descripcion, autor }) {
  const urlPublica = `http://localhost:5173/biblio`;
  
  const text = `Lee conmigo este libro que está muy interesante, se llama "${title}", es de ${categoria} y trata más o menos de ${descripcion} y fue escrito por ${autor}. Lo puedes encontrar aquí: ${urlPublica}`;
  
  const encodedText = encodeURIComponent(text);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  const handleShare = () => {
    window.open(twitterUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      style={{
        backgroundColor: '#1DA1F2',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        marginLeft: '10px', // Para separar del botón WhatsApp
        marginTop: '10px'
      }}
      aria-label={`Compartir ${title} en Twitter`}
    >
      Compartir en Twitter
    </button>
  );
}
