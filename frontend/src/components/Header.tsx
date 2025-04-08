import React, { useContext, useState } from 'react';
import './Header.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../images/cinenicheicon_720.png';
import { UserContext } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
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
              <button>Account</button>
              <button>Privacy Policy</button>
              <button>
                <div className='custom-logout'>
                  <Logout>Logout <AuthorizedUser value="email" /></Logout>
                </div>
              </button>
            </div>
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
