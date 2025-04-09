import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {

    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
      navigate(path);
    };

    return (
        <>
            <footer className="footer">
                <a onClick={() => handleNavigation('/PrivacyPage')} className="footer-text">Privacy Policy</a>
            </footer>
        </>
    );
};

export default Footer;
