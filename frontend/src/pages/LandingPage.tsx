import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import rick from '../images/rick.png';
import PrivacyPage from './PrivacyPageLoggedIn';
import Footer from '../components/Footer';
function LandingPage() {

    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
      navigate(path);
    };
    return (
        <>  
            <Header/>
            <h1>You got rick rolled</h1>
            <img src={rick}/>
            <p>
                This is the landing page. 
                This is the first page that logged out users see.
            </p>
            <button className="btn" onClick={() => handleNavigation('/login')}>Login</button>
            <button className="btn" onClick={() => handleNavigation('/register')}>Register</button>
            <Footer/>
        </>
    );
}


export default LandingPage;