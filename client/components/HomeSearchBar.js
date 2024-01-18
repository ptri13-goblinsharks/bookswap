import React, { useEffect, useState } from 'react';
import GoogleMap from './GoogleMap';

function HomeSearchBar() {
  const mockBooks = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      fullAddress: '123 Main St, Los Angeles, CA 90001',
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      fullAddress: '456 Oak St, Santa Monica, CA 90401',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      fullAddress: '789 Maple Ave, Pasadena, CA 91101',
    },
  ];

  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('/action/globalLibrary')
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        books(data);
      });
  }, []);

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchBook.toLowerCase());
  });

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSearchBook('');
  };

  return (
    <div className='home-container'>
      <div className='search-container'>
        <input
          className='home-searchbar'
          type='text'
          placeholder='Find book'
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
        />
        <div>
          {searchBook &&
            filteredBooks.map((book, index) => (
              <ul key={index}>
                <li>{book.title}</li>
                <li>{book.author}</li>
                <li>{book.genre}</li>
                <li>{book.fullAddress}</li>
                <button onClick={() => handleBookSelect(book)}>
                  Show on map
                </button>
              </ul>
            ))}
        </div>
        <div>
          {selectedBook && (
            <ul>
              <li>{selectedBook.title}</li>
              <li>{selectedBook.author}</li>
              <li>{selectedBook.genre}</li>
              <li>{selectedBook.fullAddress}</li>
            </ul>
          )}
        </div>
      </div>
      <GoogleMap selectedBook={selectedBook} className='google-map' />
    </div>
  );
}

export default HomeSearchBar;
