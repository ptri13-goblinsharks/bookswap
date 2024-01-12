// do I need this component? Maybe I can just modify HomeSearchBar
// to pass correct model through props


import React from 'react'
import { useState, useEffect } from 'react';
import { mockBooks } from './HomeSearchBar'



const AddBook = () => {
    const [books, setBooks] = useState([]);
    const [searchBook, setSearchBook] = useState('');
    const [selectedBook, setSelectedBook] = useState('null');
  
    useEffect(() => {
        setBooks(mockBooks);
      }, []);


    return (
    <div>AddBook</div>
    )
}

export default AddBook