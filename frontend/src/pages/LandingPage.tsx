import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
      navigate(path);
    };
    return (
        <>  
            <Header/>
            <p>
                This is the landing page. 
                This is the first page that logged out users see.
            </p>
            <button className="btn" onClick={() => handleNavigation('/login')}>Login</button>
            <button className="btn" onClick={() => handleNavigation('/register')}>Register</button>
        </>
    );
}


export default LandingPage;