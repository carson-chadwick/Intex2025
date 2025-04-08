// frontend/src/pages/HomePage.tsx
import React from 'react';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import './Homepage.css'; // If you have custom styling for HomePage
import Recommender from '../components/RecommenderComponent';

const HomePage: React.FC = () => {
  const user_id = 5;
  return (
    <AuthorizeView>
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
            userId={user_id}
            Name="Top Picks For You"
          />
          <Recommender
            type="homeGenre"
            userId={user_id}
            Name="Recommended by Genre"
          />
        </div>
      </div>
    </AuthorizeView>
  );
};

export default HomePage;
