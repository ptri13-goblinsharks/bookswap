import React, { useState, useEffect } from 'react';
import HomeNavBar from './HomeNavBar';
import AddBook from './AddBook';
//import BorrowedBooks from '../components/BorrowedBooks';
//import CheckedOut from '../components/CheckedOut';
import MyBooks from './MyBooks';
import { useSelector } from 'react-redux';

const MyLibrary = () => {

  // pull library data from DB here and pass to search bar as props.

  const [myLibraryBooks, setMyLibraryBooks] = useState([]);

  useEffect(() => {
    fetch('/action/getLibrary')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setMyLibraryBooks(data);
      })
  }, [])


  return (
    <div>
      <HomeNavBar />
      <AddBook />
      <MyBooks books={myLibraryBooks} />
    </div>
  );
};

export default MyLibrary;
