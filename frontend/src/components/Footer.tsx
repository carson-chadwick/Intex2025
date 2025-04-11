import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthorizeView';
import Cookies from 'js-cookie';

const translations: Record<string, { privacy: string }> = {
  en: { privacy: 'Privacy Policy' },
  es: { privacy: 'Política de Privacidad' },
};

const Footer: React.FC = () => {
  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

  // Authentication
  const user = useContext(UserContext);
  const isLoggedIn = !!user;

  // Navigation
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <a
        onClick={() =>
          handleNavigation(
            isLoggedIn ? '/PrivacyPageLoggedIn' : '/PrivacyPageLoggedOut'
          )
        }
        className="footer-text"
      >
        {t.privacy}
      </a>
    </footer>
  );
};

export default Footer;
