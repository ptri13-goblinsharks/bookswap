/**
 * ************************************
 *
 * @module  AddBook.js
 * @author
 * @date
 * @description search bar that takes input and adds book to personal library
 *
 * ************************************
 */

import React from 'react'
import { useState, useEffect } from 'react';
import MyBooks from './MyBooks';


const AddBook = () => {
    const [books, setBooks] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [selectedBook, setSelectedBook] = useState('null');
  
    //make POST request for book data: /library/addBook
    //checks global library first before making API call, for performance

    const handleBookSelect = (book) => {
        console.log(`book: ${book}`)
        fetch('/library/action/findBook', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({title:book}),
        })
        .then(data => data.json())
        .then(data => {
            setSelectedBook(data);
            setSearchBook('');
        })
       
      };
    // throw handler here for adding book
    // POST to library/action/addBook

      
    return (
    <><div> <input
            className='add-search-bar'
            type='text'
            placeholder='Search a book title to add to your library'
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)} /></div><div>
                {selectedBook && (
                    <ul>
                        <li>{selectedBook.title}</li>
                        <li>{selectedBook.author}</li>
                        <li>{selectedBook.genre}</li>
                        <button onClick={() => handleBookSelect(searchBook)}>
                  Add Book
                </button>
                    </ul>
                )}
            </div></>
    )
}

export default AddBook