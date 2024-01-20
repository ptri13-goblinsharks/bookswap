import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookSwapLogo from '../assets/images/BookSwap.png';

function HomeNavBar() {
  const [unread, setUnread] = useState('');
  useEffect(() => {
    fetch('/action/getNotifications')
      .then((data) => data.json())
      .then((data) => {
        const newUnread = data.filter((item) => item.read === false);
        // console.log(newUnread);
        setUnread(newUnread.length);
      })
      .catch((err) =>
        console.log('App error getting number of unread notifications: ', err)
      );
  });

  return (
    <nav className='home-navbar'>
      <Link to='/home'>
        <img
          src={BookSwapLogo}
          style={{ width: '70px' }}
          className='bookswap-logo'
        />
      </Link>
      <Link to='/myLibrary'>
        <h2>My Library</h2>
      </Link>
      <Link to='/requests'>
        <h2>Requests</h2>
      </Link>
      <Link to='/notifications'>
        <h2>Notifications ({unread} unread)</h2>
      </Link>
      <Link to='/profile'>
        <h2>Profile</h2>
      </Link>
      <h2>
        <a href='/action/logout'>Log out</a>
      </h2>
    </nav>
  );
}

export default HomeNavBar;
