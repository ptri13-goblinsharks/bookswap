import React, { useState } from 'react'
import HomeNavBar from './HomeNavBar';
import AddBook from './AddBook';
//import BorrowedBooks from '../components/BorrowedBooks';
//import CheckedOut from '../components/CheckedOut';
import MyBooks from './MyBooks';
import { useSelector } from 'react-redux';

const MyLibrary = () => {
    // pull library data from DB here and pass to search bar as props.

    const [myLibraryBooks, setMyLibraryBooks] = useState('');
    
    //call to personal library 
    //Ben building route for DB call
    fetch('')
    .then (data => {
        setMyLibraryBooks(data);
    })
  

  return (
    <div>
        <HomeNavBar />
        <MyBooks books={myLibraryBooks}/>
        <AddBook />
        
    </div>

  )
}

export default MyLibrary