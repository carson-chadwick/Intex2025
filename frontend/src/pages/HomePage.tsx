import React, { useEffect, useState } from 'react';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import './Homepage.css';
import Recommender from '../components/RecommenderComponent';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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
    <AuthorizeView>
      <Header />
      <div className="home-container">
        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>
        <div className="content">
          <h1>Welcome to Intex2025</h1>
          <p>Your personalized homepage</p>
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
    </AuthorizeView>
  );
};

export default HomePage;
