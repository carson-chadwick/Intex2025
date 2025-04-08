// frontend/src/pages/HomePage.tsx
import React from 'react';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import './Homepage.css'; // If you have custom styling for HomePage
import Recommender from '../components/RecommenderComponent';

const HomePage: React.FC = () => {
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
          <Recommender user_id={1} show_id=null Name="Suggested For You" />
          <Recommender user_id={2} show_id=null Name="Suggested For You 2" />
        </div>
      </div>
    </AuthorizeView>
  );
};

export default HomePage;
