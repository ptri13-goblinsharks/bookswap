import React from 'react'
import HomeNavBar from './HomeNavBar';
import AddBook from '../components/AddBook';
import HomeSearchBar from '../components/HomeSearchBar';
import BorrowedBooks from '../components/BorrowedBooks';
import CheckedOut from '../components/CheckedOut';

const MyLibrary = () => {
    // pull library data from DB here and pass to search bar as props.
    // reuse HomeSearchBar.js instead of AddBook.js
    let libraryBooks;
    fetch('')
    .then (data => {
        libraryBooks = data;
    })

  return (
    <div>
        <HomeNavBar />
        <HomeSearchBar books={libraryBooks}/>
        <BorrowedBooks />
        <CheckedOut />
    </div>

  )
}

export default MyLibrary