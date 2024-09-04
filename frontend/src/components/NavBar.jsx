import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  
   const handleLogout = ()=>{
     alert("working on it....");
   }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Booki</Link>
        </div>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/liked-books" className="hover:underline">Liked Books</Link></li>
          
          {!localStorage.getItem("accessToken") ? (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/signup" className="hover:underline">Signup</Link></li>
            </>
          ) : (
            <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
          )}
           
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
