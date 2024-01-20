import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MyBooks = ({ books }) => {
  // const [myBooks, setMyBooks] = useState([]);

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

  // useEffect(() => {
  //   setMyBooks(mockBooks);
  // }, [mockBooks]);

  const retrievedBooks = books.map((item) => item.book);
  console.log('my retrieved books are', retrievedBooks);

  return (
    <div>
      <Carousel responsive={responsive}>
        {retrievedBooks.map(
          (book, index) =>
            book && (
              <div key={index}>
                <img src={book.previewUrl} style={{ height: '300px' }}></img>
                <li>{book.title}</li>
                <li>{book.author}</li>

                {/* Add other book details as needed */}
              </div>
            )
        )}
      </Carousel>
    </div>
  );
};

export default MyBooks;
