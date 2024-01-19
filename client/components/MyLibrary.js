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
      .then((data) => data.json())
      .then((data) => {
        setMyLibraryBooks(data);
      });
  }, []);

  return (
    <div>
      <HomeNavBar />
      {/* <MyBooks books={myLibraryBooks} /> */}
      {myLibraryBooks.length > 0 ? <MyBooks books={myLibraryBooks} /> : <div>No books yet.</div>}
      <AddBook updateBooks={(data) => setMyLibraryBooks(data)}/>

    </div>
  );
};

export default MyLibrary;
