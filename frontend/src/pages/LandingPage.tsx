import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import rick from '../images/rick.png';
import PrivacyPage from './PrivacyPage';
import Footer from '../components/Footer';
import Recommender from '../components/RecommenderComponent';
function LandingPage() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <Header />
      <h1>You got rick rolled</h1>
      <img src={rick} />
      <p>
        This is the landing page. This is the first page that logged out users
        see.
      </p>
      <button className="btn" onClick={() => handleNavigation('/login')}>
        Login
      </button>
      <button className="btn" onClick={() => handleNavigation('/register')}>
        Register
      </button>

      <Recommender Name="Top Hits" type="topHits" />
      <Recommender Name="Editors Picks" type="editorsPicks" />
      <Recommender Name="Recently Added" type="recentlyAdded" />

      <Footer />
    </>
  );
}

export default LandingPage;
