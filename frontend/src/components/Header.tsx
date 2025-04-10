import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../images/NewCineNicheLogo.png';
import { UserContext } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
const Header: React.FC = () => {
  //Cool scroll effect stuff
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <header
          id="header"
          className="header d-flex align-items-center fixed-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a
              onClick={() => handleNavigation('/HomePage')}
              className="logo d-flex align-items-center me-auto"
            >
              <img src={logo} className="logo-img" />
            </a>

            <nav id="navmenu" className="navmenu">
              <ul>
                {/* Todo: className="active" for the page you are on */}
                <li>
                  <a onClick={() => handleNavigation('/HomePage')}>Home</a>
                </li>
                <li>
                  <a onClick={() => handleNavigation('/AllMoviesPage')}>
                    AllMovies
                  </a>
                </li>
                <li>
                  <a onClick={() => handleNavigation('/AdminPage')}>Admin</a>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a
              className="icon profile-icon"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle />
            </a>
            <div
              className={`profile-dropdown ${isDropdownOpen ? 'active' : ''}`}
            >
              <button onClick={() => handleNavigation('/AccountPage')}>
                Account
              </button>
              <Logout>Logout </Logout>
            </div>
          </div>
        </header>
      ) : (
        <header
          id="header"
          className="header d-flex align-items-center fixed-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a
              onClick={() => handleNavigation('/HomePage')}
              className="logo-link"
              style={{ display: 'inline-block', cursor: 'pointer' }} // 👈 This limits the hitbox
            >
              <img
                src={logo}
                className="logo-img"
                alt="CineNiche Logo"
                style={{ height: '40px', width: 'auto', display: 'block' }}
              />
            </a>

            <nav id="navmenu" className="navmenu">
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a
              className="icon profile-icon"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle />
            </a>
            <div
              className={`profile-dropdown ${isDropdownOpen ? 'active' : ''}`}
            >
              <button onClick={() => handleNavigation('/login')}>Login</button>
              <button onClick={() => handleNavigation('/register')}>
                Get Started
              </button>
            </div>
          </div>
        </header>
        // <header className="header">
        //   <div className="logo">
        //     <img src={logo} alt="CineNiche Logo" className="logo-img" />
        //   </div>

        //   <div className="header-right">
        //     <div className="icon profile-icon" onClick={() => setDropdownOpen(!isDropdownOpen)}>
        //       <FaUserCircle/>
        //     </div>

        //     <div className={`profile-dropdown ${isDropdownOpen ? "active" : ""}`}>
        //       <button onClick={() => handleNavigation('/login')}>Login</button>
        //       <button onClick={() => handleNavigation('/register')}>Get Started</button>
        //     </div>
        //   </div>
        // </header>
      )}
    </>
  );
};

export default Header;

// <header className="header">
//   <div className="logo" onClick={() => handleNavigation('/HomePage')} style={{ cursor: 'pointer' }}>
//     <img src={logo} alt="CineNiche Logo" className="logo-img" />
//   </div>

//   <div className="header-right">
//     <button className="btn" onClick={() => handleNavigation('/HomePage')}>Home</button>
//     <button className="btn" onClick={() => handleNavigation('/AllMoviesPage')}>All Movies</button>
//     <button className="btn" onClick={() => handleNavigation('/AdminPage')}>Admin</button>
//     <FaSearch className="icon" />
//     {/* Profile Icon and Dropdown */}

//     <div className="icon profile-icon" onClick={() => setDropdownOpen(!isDropdownOpen)}>
//       <FaUserCircle/>
//     </div>

//     <div className={`profile-dropdown ${isDropdownOpen ? "active" : ""}`}>
//       <button onClick={() => handleNavigation('/AccountPage')}>Account</button>
//       <Logout>Logout </Logout>
//     </div>
//   </div>
// </header>
