/**
 * ************************************
 *
 * @module  AddBook.js
 * @author
 * @date
 * @description search bar that takes input and uses it to call to openLibrary API
 * https://openlibrary.org/developers/api
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
  


    return (
    <div>AddBook</div>
    )
}

export default AddBook