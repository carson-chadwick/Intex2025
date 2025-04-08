// frontend/src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/Header';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import './Homepage.css'; // If you have custom styling for HomePage
import Recommender from '../components/RecommenderComponent';

const HomePage: React.FC = () => {
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
          <Recommender Id={1} Name="Suggested For You" />
          <Recommender Id={2} Name="Suggested For You 2" />
        </div>
      </div>
    </AuthorizeView>
  );
};

export default HomePage;
