import React, { useContext, useState, useEffect  } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../images/NewCineNicheLogo.png';
import { UserContext } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';

const Header: React.FC = () => {
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

  // 🔒 Auth + role check
  const user = useContext(UserContext);
  const isLoggedIn = !!user;
  const isAdmin = user?.roles?.includes('Administrator');

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);


  //Profile stuff
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const getInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return null;
  };

  return (
    <>
      {isLoggedIn ? (
        <header id="header" className="header d-flex align-items-center fixed-top">
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a
              onClick={() => handleNavigation('/HomePage')}
              className="logo d-flex align-items-center me-auto">
              <img src={logo} className="logo-img" />
            </a>

            <nav id="navmenu" className="navmenu">
              <ul>
                <li><a onClick={() => handleNavigation('/HomePage')}>Home</a></li>
                <li><a onClick={() => handleNavigation('/AllMoviesPage')}>All Movies</a></li>
                {isAdmin && ( // ✅ Only show if user is an Administrator
                  <li><a onClick={() => handleNavigation('/AdminPage')}>Admin</a></li>
                )}
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a className="icon profile-icon" onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {profileImage ? (
                <img src={profileImage} className="profile-img-icon" alt="Profile" />
              ) : user?.email ? (
                <div className="profile-img-icon profile-initial-icon">
                  {user.email.charAt(0).toUpperCase()}
                </div>
              ) : (
                <FaUserCircle />
              )}
            </a>
            <div
              className={`profile-dropdown ${isDropdownOpen ? 'active' : ''}`}
            >
              <button onClick={() => handleNavigation('/AccountPage')}>
                Account
              </button>
              <Logout>Logout</Logout>
            </div>
          </div>
        </header>
      ) : (
        <header
         
          id="header"
         
          className="header d-flex align-items-center fixed-top"
        
        >
          <div className="container-xl position-relative d-flex align-items-center">
          {/* <div className="container-fluid container-xl position-relative d-flex align-items-center"> */}
            <a
              onClick={() => handleNavigation('/LandingPage')}
              className="logo d-flex align-items-center me-auto"
            >
              <img src={logo} className="logo-img" />
            </a>

            <nav id="navmenu" className="navmenu">
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a
              className="icon profile-icon"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle className='profile-img-icon'/>
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
      )}
    </>
  );
};

export default Header;

        