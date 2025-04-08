import React from 'react';
// import Logout from '../components/Logout';
import Slideshow from '../components/Slideshow';
import Recommender from '../components/RecommenderComponent';

const LandingPage: React.FC = () => {
  return (
    <div className="home-container">
      {/* <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span> */}
      <Slideshow />
      <div className="content">
        <Recommender Id={1} Name="Whats Popular" />
        <Recommender Id={2} Name="Editor Picks" />
      </div>
    </div>
  );
};

export default LandingPage;
