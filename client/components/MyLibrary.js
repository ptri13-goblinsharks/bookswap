import React, { useState, useEffect } from 'react';
import HomeNavBar from './HomeNavBar';
import AddBook from './AddBook';
//import BorrowedBooks from '../components/BorrowedBooks';
//import CheckedOut from '../components/CheckedOut';
import MyBooks from './MyBooks';
import { useSelector } from 'react-redux';

const MyLibrary = () => {
    
    
    //call to personal library 
    // route is '/getLibrary/' - 
    

// pull library data from DB here and pass to search bar as props.

    const [myLibraryBooks, setMyLibraryBooks] = useState([]);

    // fetch('/action/getLibrary')
    // .then (data => {
    //     setMyLibraryBooks(data.json());
    // })

  useEffect( () => {
    fetch('/action/getLibrary')
    .then(data => data.json())
    .then (data => {

      setMyLibraryBooks(data);

    })
  }, [])

  //console.log(`current state: ${myLibraryBooks}`)

  return (
    <div>
      <HomeNavBar />
      <MyBooks books={myLibraryBooks} />
      <AddBook />
    </div>
  );
};

export default MyLibrary;
