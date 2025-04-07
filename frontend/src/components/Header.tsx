import React, { useState } from 'react';
import './Header.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../images/cinenicheicon_720.png';

const Header: React.FC = () => {
  const [isLoggedIn] = useState<boolean>(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="CineNiche Logo" className="logo-img" />
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <>
            <button className="btn">Products</button>
            <button className="btn">My List</button>
            <FaSearch className="icon" />
            <FaUserCircle className="icon profile-icon" />
          </>
        ) : (
          <>
            <button className="btn">Sign in</button>
            <button className="btn">Register</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
