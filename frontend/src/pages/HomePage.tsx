// frontend/src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/Header';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import './Homepage.css'; // If you have custom styling for HomePage

const HomePage: React.FC = () => {
  return (
    <AuthorizeView>
    <div className="home-container">
      <Header />
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
      <div className="content">
        <h1>Welcome to Intex2025</h1>
        <p>Your personalized homepage</p>
      </div>
    </div>
    </AuthorizeView>
  );
};

export default HomePage;

