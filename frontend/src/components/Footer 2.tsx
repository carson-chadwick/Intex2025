import React, { useContext } from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthorizeView';

const Footer: React.FC = () => {
    //authentication stuff
    const user = useContext(UserContext);
    const isLoggedIn = !!user;

    //navigation stuff
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <>
            {isLoggedIn ? (
                <footer className="footer">
                    <a onClick={() => handleNavigation('/PrivacyPageLoggedIn')} className="footer-text">Privacy Policy</a>
                </footer>
            ) : (
                <footer className="footer">
                    <a onClick={() => handleNavigation('/PrivacyPageLoggedOut')} className="footer-text">Privacy Policy</a>
                </footer>
            )}
        </>
    );
};

export default Footer;
