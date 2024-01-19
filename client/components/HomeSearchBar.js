import React, { useEffect, useState } from 'react';
import GoogleMap from './GoogleMap';

function HomeSearchBar() {


  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [foundBooks, setFoundBooks] = useState([])

  useEffect(() => {
    fetch('/library/action/globalLibrary')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBooks(data);
      });
  }, []);

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchBook.toLowerCase());
  });

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSearchBook('');
    fetch('/library/action/retrieveBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: book.title })
    })
      .then(data => data.json())
      .then(data => {
        console.log('found books are: ', data);
        setFoundBooks(data)
      })
      .catch(err => console.log('App error retrieving book: ', err))
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
                {/* <li>{book.address}</li> */}
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
              {/* <li>{selectedBook.address}</li> */}
            </ul>
          )}
        </div>
      </div>
      {foundBooks.length > 0 && (<GoogleMap books={foundBooks} className='google-map' />)}
      {/* <GoogleMap selectedBook={foundBooks} className='google-map' /> */}
    </div>
  );
}

// Route to request a swap: post /library/action/sendSwapRequest 
// Request body should include: { book, reqUsername and resUsername } 
// The book should be an object i.e. include title, author, previewUrl 

export default HomeSearchBar;
