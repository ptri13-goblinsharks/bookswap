import React from 'react';
import { Link } from 'react-router-dom';
import BookSwapLogo from '../assets/images/BookSwap.png';

function HomeNavBar() {
  return (
    <nav className='home-navbar'>
      <Link to='/home'>
        <img src={BookSwapLogo} style={{width: '70px'}} className='bookswap-logo' />
      </Link>
      <Link to='/myLibrary'>
        <h2>My Library</h2>
      </Link>
      <Link to='/requests'>
        <h2>Requests</h2>
      </Link>
      <Link to='/notifications'>
        <h2>Notifications</h2>
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
