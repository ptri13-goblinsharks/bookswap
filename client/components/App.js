import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import MyLibrary from './MyLibrary';
import HomeNavBar from './HomeNavBar';
import ProtectedRoute from './ProtectedRoute.jsx';
import Notifications from './Notifications.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/myLibrary' element={
          <ProtectedRoute>
            <MyLibrary />
          </ProtectedRoute>
        } />
        <Route path='/notifications' element={<Notifications />} />
      </Routes>
    </div>
  );
}

export default App;
