import React, { useContext, useState } from 'react';
import './Header.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../images/cinenicheicon_720.png';
import { UserContext } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  //authentication stuff
  const user = useContext(UserContext);
  const isLoggedIn = !!user;

  //navigation stuff
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  //profile dropdown stuff
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  return (
    <>
      {isLoggedIn ? (
        <header className="header">
          <div className="logo" onClick={() => handleNavigation('/HomePage')} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="CineNiche Logo" className="logo-img" />
          </div>

          <div className="header-right">
            <button className="btn" onClick={() => handleNavigation('/HomePage')}>Home</button>
            <button className="btn" onClick={() => handleNavigation('/MyListPage')}>My List</button>
            <button className="btn" onClick={() => handleNavigation('/AdminPage')}>Admin</button>
            <FaSearch className="icon" />
            {/* Profile Icon and Dropdown */}

          <div className="icon profile-icon" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <FaUserCircle/>
          </div>

          <div className={`profile-dropdown ${isDropdownOpen ? "active" : ""}`}>
            <h4>Profile</h4>
            <label>
              Make Phone Number Public
              <input type="checkbox" />
            </label>
            <label>
              Make Personality Profile Public
              <input type="checkbox" />
            </label>
            <button>Logout</button>
            {/* <button onClick={handleLogout} className="logout-button">
              Logout
            </button> */}
          </div>
            {/* Todo: make the FaUserCircle create a dropdown menu with the following items:
            - Account
            - Privacy Policy
            - Logout */}
            {/* <FaUserCircle className="icon profile-icon" /> */}
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="logo">
            <img src={logo} alt="CineNiche Logo" className="logo-img" />
          </div>

          <div className="header-right">
            <FaUserCircle className="icon profile-icon" />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
