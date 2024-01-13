import React, { useState } from 'react'
import HomeNavBar from './HomeNavBar';
// import AddBook from '../components/AddBook';
import HomeSearchBar from '../components/HomeSearchBar';
import BorrowedBooks from '../components/BorrowedBooks';
import CheckedOut from '../components/CheckedOut';
import MyBooks from '../components/MyBooks';
import { useSelector } from 'react-redux';

const MyLibrary = () => {
    // pull library data from DB here and pass to search bar as props.
    // reuse HomeSearchBar.js instead of AddBook.js

    const [myLibraryBooks, setMyLibraryBooks] = useState('');
    const [globalLibraryBooks, setGlobalLibraryBooks] = useState('');
    
    //call to personal library 
    fetch('')
    .then (data => {
        setMyLibraryBooks(data);
    })
    //call to global library
    fetch('')
    .then (data => {
        setGlobalLibraryBooks(data);
    })

  return (
    <div>
        <HomeNavBar />
        <HomeSearchBar books={globalLibraryBooks}/>
        <MyBooks books={myLibraryBooks}/>
        <BorrowedBooks books={myLibraryBooks} />
        <CheckedOut books={myLibraryBooks}/>
    </div>

  )
}

export default MyLibrary