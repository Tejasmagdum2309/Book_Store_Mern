import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LikedBooks from './pages/LikedBooks';
import NavBar from './components/NavBar';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/liked-books" element={<ProtectedRoute element={<LikedBooks />} />} />
      </Routes>
    </Router>
  );
}

export default App;
