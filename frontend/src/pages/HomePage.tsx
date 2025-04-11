import React, { useEffect, useState } from 'react';
import AuthorizeView from '../components/AuthorizeView';
import './Homepage.css';
import CarouselRecommender from '../components/CarouselRecommender';
import Header from '../components/Header';
import Footer from '../components/Footer';
import landingPageImage from '../images/landingpagebackground.png';
import Cookies from 'js-cookie';

const translations = {
  en: {
    heading1: 'Hidden Gems.',
    heading2: 'Found Just For You.',
    getStarted: 'Get Started',
    watchVideo: 'Watch Video',
    topPicks: 'Top Picks',
    byGenre: 'By Genre',
  },
  es: {
    heading1: 'Joyas ocultas.',
    heading2: 'Encontradas solo para ti.',
    getStarted: 'Comenzar',
    watchVideo: 'Ver video',
    topPicks: 'Mejores recomendaciones',
    byGenre: 'Por género',
  },
};

const HomePage: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const pingResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/pingauth`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!pingResponse.ok) throw new Error('Failed to fetch auth info');
        const pingData = await pingResponse.json();

        if (!pingData.email) throw new Error('Email not returned');

        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/user/by-email/${encodeURIComponent(
            pingData.email
          )}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!userResponse.ok) throw new Error('Failed to fetch user by email');
        const userData = await userResponse.json();
        setUserId(userData.user_id);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading || userId === null) {
    return <div>Loading personalized recommendations...</div>;
  }

  return (
    <>
      <AuthorizeView>
        <Header />
        <section
          id="hero"
          className="hero section dark-background"
          style={{ height: '500px', minHeight: 'unset' }}
        >
          <img src={landingPageImage} alt="Hero Background" />
          <div className="container d-flex flex-column align-items-center">
            <h2>{t.heading1}</h2>
            <h2>{t.heading2}</h2>
            <div className="d-flex mt-4">
              <a href="#about" className="btn-get-started">
                {t.getStarted}
              </a>
              <a
                href="https://youtu.be/ZMsTMuyH7w8?si=u6OcALxIEf3RXgQj"
                className="glightbox btn-watch-video d-flex align-items-center"
              >
                <i className="bi bi-play-circle"></i>
                <span>{t.watchVideo}</span>
              </a>
            </div>
          </div>
        </section>

        <div className="py-16">
          <CarouselRecommender
            Name={t.topPicks}
            userId={userId}
            type="homeTop"
            autoScroll={false}
          />
        </div>
        <div>
          <CarouselRecommender
            Name={t.byGenre}
            userId={userId}
            type="homeGenre"
            autoScroll={false}
          />
        </div>

        <Footer />
      </AuthorizeView>
    </>
  );
};

export default HomePage;
