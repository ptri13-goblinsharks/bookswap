import React, { useEffect, useState } from 'react';
import GoogleMap from './GoogleMap';

function HomeSearchBar() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookAddress, setBookAddress] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('/library/action/globalLibrary')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBooks(data);
      });

    fetch('/action/getUser')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log('App error getting user:', err));
  }, []);

  // useEffect(() => {
  //   console.log('SEARCHBOOK->', searchBook);
  // }, []);

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchBook.toLowerCase());
  });

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSearchBook('');
    fetch('library/action/retrieveBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: book.title }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('address data ->', data);
        setBookAddress(data);
      });
  };

  const handleRequestBook = (book, reqUsername, resUsername) => {
    console.log(`book is ${book}, requsername is ${reqUsername}, resUsenrame is ${resUsername}`)
    fetch('/library/action/sendSwapRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book: book, reqUsername: reqUsername, resUsername: resUsername })
    })
      .then((data) => data.json())
      .catch((err) => console.log('error requesting book: ', err));
  };

  return (
    <div className='home-container'>
      <div>
      <h1>Search for a book</h1>
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
                {/* <li>{book.genre}</li> */}
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
              <img src={selectedBook.previewUrl} style={{ height: '300px' }} />
              <li>{selectedBook.title}</li>
              <li>{selectedBook.author}</li>
            </ul>
          )}
        </div>
      </div>
      </div>
      <GoogleMap
        bookAddress={bookAddress[0]}
        selectedBook={selectedBook}
        className='google-map'
        handleRequestBook={handleRequestBook}
        reqUsername={user.username}
      />
    </div>
  );
}

// Route to request a swap: post /library/action/sendSwapRequest
// Request body should include: { book, reqUsername and resUsername }
// The book should be an object i.e. include title, author, previewUrl

export default HomeSearchBar;

// fetch('library/action/retrieveBook', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ title: book }),
// })
//   .then((data) => data.json())
//   .then((data) => {
//     console.log(data);
