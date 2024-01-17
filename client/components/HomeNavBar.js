import React from 'react';
import { Link } from 'react-router-dom';
import BookSwapLogo from '../assets/images/BookSwap.png';

function HomeNavBar() {
  return (
    <nav className='home-navbar'>
      <Link to='/home'>
        <img src={BookSwapLogo} className='bookswap-logo' />
      </Link>
      <Link to='/myLibrary'>
        <h2>My Library</h2>
      </Link>
      <button>Log out</button>
    </nav>
  );
}

export default HomeNavBar;
