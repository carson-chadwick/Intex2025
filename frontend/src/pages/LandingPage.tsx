import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import background from '../images/background.jpg';
import Footer from '../components/Footer';
import CarouselRecommender from '../components/CarouselRecommender';

const translations: Record<
  string,
  { heading: string; getStarted: string; login: string; topHits: string; editorsPicks: string; recentlyAdded: string }
> = {
  en: {
    heading: 'Hidden Gems.\nFound Just For You.',
    getStarted: 'Get Started',
    login: 'Login',
    topHits: 'Top Hits',
    editorsPicks: "Editor's Picks",
    recentlyAdded: 'Recently Added',
  },
  es: {
    heading: 'Joyas ocultas.\nEncontradas solo para ti.',
    getStarted: 'Comenzar',
    login: 'Iniciar sesión',
    topHits: 'Éxitos Principales',
    editorsPicks: 'Selecciones del Editor',
    recentlyAdded: 'Recién Añadidos',
  },
};


function getPreferredLanguage(): 'en' | 'es' {
  const lang = Cookies.get('language');
  return lang === 'es' ? 'es' : 'en';
}


function LandingPage() {
  const navigate = useNavigate();
  const [lang] = useState<'en' | 'es'>(getPreferredLanguage());
  const t = translations[lang];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Header />
      {/* Language Toggle */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '40px',
          zIndex: 999,
        }}
      ></div>
      {/* Hero Section */}
      <div className="hero">
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />

        {/* Foreground Text and Buttons */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '5%',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 800,
            fontFamily: 'Montserrat, sans-serif',
            textAlign: 'left',
          }}
        >
          <div>
            {t.heading.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <button
              onClick={() => handleNavigation('/register')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontFamily: 'Montserrat, sans-serif',
                padding: '10px 80px',
                border: '2px solid white',
                borderRadius: '5px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              {t.getStarted}
            </button>

            <button
              onClick={() => handleNavigation('/login')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                fontFamily: 'Montserrat, sans-serif',
                padding: '10px 80px',
                border: '2px solid white',
                borderRadius: '5px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'black';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              {t.login}
            </button>
          </div>
        </div>
      </div>
      <br /> <br />
      <CarouselRecommender
        Name="Top Hits"
        type="topHits"
        leftChevron={null}
        rightChevron={null}
      />
      <br />
      <CarouselRecommender
        Name="Editors Picks"
        type="editorsPicks"
        leftChevron={null}
        rightChevron={null}
      />
      <br />
      <CarouselRecommender
        Name="Recently Added"
        type="recentlyAdded"
        leftChevron={null}
        rightChevron={null}
      />
      <Footer />
    </>
  );
}

export default LandingPage;
