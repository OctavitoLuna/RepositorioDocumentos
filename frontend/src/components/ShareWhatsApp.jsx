import React from 'react';

export default function ShareWhatsApp({ title, categoria, descripcion, autor }) {
  const urlPublica = `http://localhost:5173/biblio`;
  
  const text = `Lee conmigo este libro que está muy interesante, se llama "${title}", es de ${categoria} y trata más o menos de ${descripcion} y fue escrito por ${autor}. Lo puedes encontrar aquí: ${urlPublica}`;
  
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

  const handleShare = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      style={{
        backgroundColor: '#25D366',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        marginTop: '10px'
      }}
      aria-label={`Compartir ${title} en WhatsApp`}
    >
      Compartir en WhatsApp
    </button>
  );
}
