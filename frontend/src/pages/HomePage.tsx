import React, { useEffect, useState } from 'react';
import AuthorizeView from '../components/AuthorizeView';
import './Homepage.css';
import Recommender from '../components/RecommenderComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import background from '../images/background.jpg';


// import AOS from 'aos';
// import 'aos/dist/aos.css';

const HomePage: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1200, // Animation duration in milliseconds
  //     once: true,     // Ensure animations happen only once on scroll
  //   });
  // }, []);
  
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/current-user`,
          {
            method: 'GET',
            credentials: 'include', // Ensures cookies/session are sent
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch current user');
        }

        const data = await response.json();
        setUserId(data.user_id);
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
        <section id="hero" className="hero section dark-background">
          <img src={background} alt="Hero Background"  />
        
          <div className="container d-flex flex-column align-items-center">
            <h2 >Hidden Gems.</h2>
            <h2 >Found Just For You.</h2>
            {/* <p >
              We are a team of talented designers making websites with Bootstrap
            </p> */}
            <div className="d-flex mt-4">
              <a href="#about" className="btn-get-started">Get Started</a>
              <a 
                href="https://youtu.be/ZMsTMuyH7w8?si=u6OcALxIEf3RXgQj"
                
                className="glightbox btn-watch-video d-flex align-items-center">
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>
        </section>

        
        <div className="home-container">
          <div className="content">
            <Recommender
              type="homeTop"
              userId={userId}
              Name="Top Picks For You"
            />
            <Recommender
              type="homeGenre"
              userId={userId}
              Name="Recommended by Genre"
            />
          </div>
        </div>
        <Footer/>
      </AuthorizeView>
    </>

  );
};

export default HomePage;
