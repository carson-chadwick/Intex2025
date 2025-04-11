import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../images/NewCineNicheLogo.png';
import { UserContext } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import Cookies from 'js-cookie';

// ✅ Translations for header elements
const translations = {
  en: {
    home: 'Home',
    allMovies: 'All Movies',
    admin: 'Admin',
    account: 'Account',
    logout: 'Logout',
    login: 'Login',
    register: 'Get Started',
  },
  es: {
    home: 'Inicio',
    allMovies: 'Todas las Películas',
    admin: 'Administración',
    account: 'Cuenta',
    logout: 'Cerrar sesión',
    login: 'Iniciar sesión',
    register: 'Comenzar',
  },
};

const Header: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'es'>(() => {
    const cookieLang = Cookies.get('language');
    return cookieLang === 'es' ? 'es' : 'en';
  });

  const t = translations[lang]; // Use translations dynamically

const handleLanguageToggle = () => {
  const newLang = lang === 'en' ? 'es' : 'en';
  setLang(newLang);
  Cookies.set('language', newLang, {
    expires: 365,
    path: '/',
    sameSite: 'None',
    secure: true,
  });
  window.location.reload(); // Optional: refresh to apply language site-wide
};


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

  const user = useContext(UserContext);
  const isLoggedIn = !!user;
  const isAdmin = user?.roles?.includes('Administrator');

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-xl position-relative d-flex align-items-center">
        <a
          onClick={() =>
            handleNavigation(isLoggedIn ? '/HomePage' : '/LandingPage')
          }
          className="logo d-flex align-items-center me-auto"
        >
          <img src={logo} className="logo-img" />
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            {isLoggedIn && (
              <>
                <li>
                  <a onClick={() => handleNavigation('/HomePage')}>{t.home}</a>
                </li>
                <li>
                  <a onClick={() => handleNavigation('/AllMoviesPage')}>
                    {t.allMovies}
                  </a>
                </li>
                {isAdmin && (
                  <li>
                    <a onClick={() => handleNavigation('/AdminPage')}>
                      {t.admin}
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <a
          className="icon profile-icon"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {profileImage ? (
            <img
              src={profileImage}
              className="profile-img-icon"
              alt="Profile"
            />
          ) : user?.email ? (
            <div className="profile-img-icon profile-initial-icon">
              {user.email.charAt(0).toUpperCase()}
            </div>
          ) : (
            <FaUserCircle className="profile-img-icon" />
          )}
        </a>

        <div className={`profile-dropdown ${isDropdownOpen ? 'active' : ''}`}>
          {isLoggedIn ? (
            <>
              <button onClick={() => handleNavigation('/AccountPage')}>
                {t.account}
              </button>
              <Logout>{t.logout}</Logout>
            </>
          ) : (
            <>
              <button onClick={() => handleNavigation('/login')}>
                {t.login}
              </button>
              <button onClick={() => handleNavigation('/register')}>
                {t.register}
              </button>
            </>
          )}
          <hr />
        </div>
      </div>
    </header>
  );
};

export default Header;
