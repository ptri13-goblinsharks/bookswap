import React from 'react';
import { Link } from 'react-router-dom';

function HomeNavBar() {
  return (
    <nav className='home-navbar'>
      <Link to='/home'>
        <h2>Home</h2>
      </Link>
      <Link to='/myLibrary'>
        <h2>My Library</h2>
      </Link>
      <button>Log out</button>
    </nav>
  );
}

export default HomeNavBar;
