import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MyBooks = ({ books }) => {
  const [myBooks, setMyBooks] = useState([]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const mockBooks = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
    },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
    { title: '1984', author: 'George Orwell', genre: 'Dystopian' },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Coming-of-age',
    },
    {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
    },
    { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' },
    { title: 'Moby-Dick', author: 'Herman Melville', genre: 'Adventure' },
    { title: 'The Shining', author: 'Stephen King', genre: 'Horror' },
    { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian' },
    { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Philosophical' },
  ];

  useEffect(() => {
    setMyBooks(mockBooks);
  }, [mockBooks]);

  return (
    <div>
      <Carousel responsive={responsive}>
        {myBooks.map((book, index) => (
          <div key={index}>
            <li>{book.title}</li>
            <li>{book.author}</li>
            <li>{book.genre}</li>
            {/* Add other book details as needed */}
          </div>
        ))}
      </Carousel>
      ;
    </div>
  );
};

export default MyBooks;
