import React, { useState } from 'react';
import BusquedaLibros from '../components/BusquedaLibros';
import FiltroLibro from '../components/FiltroLibro';
import ContenidoCategoria from '../components/ContenidoCategoria';
import ModalDetalleLibro from '../components/ModalDetalleLibro';

const BiblioPage = () => {
  const [books, setBooks] = useState([
    { title: 'London and the 17th Century', author: 'Margarette Lincoln', date: '2022-01-01', category: 'Historia', image: 'link_to_image', description: 'Book description here...' },
    { title: 'The Fall of Robespierre', author: 'Colin Jones', date: '2021-05-21', category: 'Historia', image: 'link_to_image', description: 'Book description here...' },
    { title: 'Norse', author: 'Gordon Campbell', date: '2023-03-15', category: 'Ciencia', image: 'link_to_image', description: 'Book description here...' },
  ]);
  
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (searchTerm) => {
    const searchedBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(searchedBooks);
  };

  const handleFilter = (filterType) => {
    let filtered = [];
    switch (filterType) {
      case 'title':
        filtered = books.filter(book => book.title);
        break;
      case 'author':
        filtered = books.filter(book => book.author);
        break;
      case 'category':
        filtered = books.filter(book => book.category);
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
    <div className="container mx-auto">
      <header className="mb-6 flex justify-between items-center">
        <BusquedaLibros onSearch={handleSearch} />
        <FiltroLibro onFilter={handleFilter} />
      </header>

      <main>
        <ContenidoCategoria books={filteredBooks} onSelectBook={handleBookSelect} />
      </main>

      {selectedBook && <ModalDetalleLibro book={selectedBook} onClose={handleCloseModal} />}
      <style jsx>{`
        @media (max-width: 768px) {
          .content-container {
            display: block;
            margin: 0 auto;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default BiblioPage;
