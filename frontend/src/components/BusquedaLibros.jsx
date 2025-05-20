import React, { useState } from 'react';
import BusquedaLibros from '../components/BusquedaLibros';
import FiltroLibro from '../components/FiltroLibro';
import ContenidoCategoria from '../components/ContenidoCategoria';
import ModalDetalleLibro from '../components/ModalDetalleLibro';

const BiblioPage = () => {
  const [books, setBooks] = useState([
    {
      title: 'London and the 17th Century',
      author: 'Margarette Lincoln',
      date: '2022-01-01',
      category: 'Historia',
      image: 'link_to_image',
      description: 'Book description here...',
    },
    {
      title: 'The Fall of Robespierre',
      author: 'Colin Jones',
      date: '2021-05-21',
      category: 'Historia',
      image: 'link_to_image',
      description: 'Book description here...',
    },
    {
      title: 'Norse',
      author: 'Gordon Campbell',
      date: '2023-03-15',
      category: 'Ciencia',
      image: 'link_to_image',
      description: 'Book description here...',
    },
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (searchTerm) => {
    const searchedBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(searchedBooks);
  };

  const handleFilter = (filterType) => {
    let filtered = [];
    switch (filterType) {
      case 'title':
        filtered = books.filter((book) => book.title);
        break;
      case 'author':
        filtered = books.filter((book) => book.author);
        break;
      case 'category':
        filtered = books.filter((book) => book.category);
        break;
      default:
        filtered = books;
    }
    setFilteredBooks(filtered);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="biblio-page" style={{ marginTop: '15vh', padding: '0 5vw' }}>
      {/* Buscador y Filtro */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        <div style={{ flex: '1 1 70%' }}>
          <BusquedaLibros onSearch={handleSearch} />
        </div>
        <div style={{ flex: '1 1 20%', minWidth: '150px' }}>
          <FiltroLibro onFilter={handleFilter} />
        </div>
      </div>

      {/* Contenido de Categorías con estilo mejorado */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <ContenidoCategoria books={filteredBooks} onSelectBook={handleBookSelect} />
      </div>

      {selectedBook && <ModalDetalleLibro book={selectedBook} onClose={handleCloseModal} />}
    </div>
  );
};

export default BiblioPage;
