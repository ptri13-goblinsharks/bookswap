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
      {/* <button>Log out</button> */}
      <h2><a href="/action/logout">Logout</a></h2>
    </nav>
  );
}

export default HomeNavBar;
