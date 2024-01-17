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
    // { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' },
    // { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    // {
    //   title: 'The Catcher in the Rye',
    //   author: 'J.D. Salinger',
    //   genre: 'Coming-of-age',
    // },
    // {
    //   title: "Harry Potter and the Sorcerer's Stone",
    //   author: 'J.K. Rowling',
    //   genre: 'Fantasy',
    // },
    // { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
    // {
    //   title: 'The Lord of the Rings',
    //   author: 'J.R.R. Tolkien',
    //   genre: 'Fantasy',
    // },
    // { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian' },
    // {
    //   title: 'The Chronicles of Narnia',
    //   author: 'C.S. Lewis',
    //   genre: 'Fantasy',
    // },
    // { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Classic' },
    // { title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
    // {
    //   title: "The Hitchhiker's Guide to the Galaxy",
    //   author: 'Douglas Adams',
    //   genre: 'Science Fiction',
    // },
    // { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Gothic' },
    // { title: 'Moby-Dick', author: 'Herman Melville', genre: 'Adventure' },
    // { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Philosophical' },
    // {
    //   title: 'The Girl with the Dragon Tattoo',
    //   author: 'Stieg Larsson',
    //   genre: 'Mystery',
    // },
    // { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic' },
    // {
    //   title: 'The Grapes of Wrath',
    //   author: 'John Steinbeck',
    //   genre: 'Historical Fiction',
    // },
  ];

  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setBooks(mockBooks);
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
