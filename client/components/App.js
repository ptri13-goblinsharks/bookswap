import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import MyLibrary from './MyLibrary';

function App() {
  return (
    <Routes>
      <Route path='home' element={<Home />} />
      <Route path='/' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      {/* <Route path='myLibrary' element={<MyLibrary />} /> */}
    </Routes>
  );
}

export default App;
