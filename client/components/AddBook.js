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
import { mockBooks } from './HomeSearchBar'



const AddBook = () => {
    const [books, setBooks] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [selectedBook, setSelectedBook] = useState('null');
  
    //make POST request for book data: /library/addBook
    //checks global library first before making API call, for performance

    const handleBookSelect = (book) => {
        setSelectedBook(book);
        setSearchBook('');
      };
      
    return (
    <><div> <input
            className='add-search-bar'
            type='text'
            placeholder='Add a book'
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)} /></div><div>
                {selectedBook && (
                    <ul>
                        <li>{selectedBook.title}</li>
                        <li>{selectedBook.author}</li>
                        <li>{selectedBook.genre}</li>
                    </ul>
                )}
            </div></>
    )
}

export default AddBook