/**
 * ************************************
 *
 * @module  MyBooks.js
 * @author
 * @date
 * @description display componenent that renders user library
 *
 * ************************************
 */


import React, { useState, useEffect } from 'react';

const MyBooks = ({books}) => {

  const [myBooks, setMyBooks] = useState([]);
    // const myBooks = props.books.map(element => {
    //     element.previewUrl;
    // })
    useEffect(() => {
setMyBooks(books);
    },[books])

  return (
    <div>
        {myBooks.map((book, index) => (
            <ul key={index}>
              <li>{book.title}</li>
              <li>{book._id}</li>
            </ul>
            ))}
      </div>
  )
}

export default MyBooks
