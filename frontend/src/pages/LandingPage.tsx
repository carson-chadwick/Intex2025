import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import rick from '../images/rick.png';
function LandingPage() {

    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
      navigate(path);
    };
    return (
        <>  
            <Header/>
            <h1>You got rick rolled</h1>
            <img src={rick}/>
            <p>
                This is the landing page. 
                This is the first page that logged out users see.
            </p>
            <button className="btn" onClick={() => handleNavigation('/login')}>Login</button>
            <button className="btn" onClick={() => handleNavigation('/register')}>Register</button>
        </>
    );
}


export default LandingPage;

// import React, { useEffect } from 'react';
// // import Logout from '../components/Logout';
// import Slideshow from '../components/Slideshow';
// import Recommender from '../components/RecommenderComponent';

// const LandingPage: React.FC = () => {
//   useEffect(() => {
//     if (document.querySelector('script[src="/slideshow.js"]')) return;

//     const script = document.createElement('script');
//     script.src = '/slideshow.js';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.initSlideshow) {
//         window.initSlideshow();
//       }
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <>
//       {/* <Slideshow /> */}
//     </>
//   );
// };

// export default LandingPage;

// import React, { useEffect } from 'react';
// // import Logout from '../components/Logout';
// import Slideshow from '../components/Slideshow';
// import Recommender from '../components/RecommenderComponent';

// useEffect(() => {
//   const script = document.createElement('script');
//   script.src = '/slideshow.js';
//   script.async = true;
//   document.body.appendChild(script);

//   script.onload = () => {
//     if (window.initSlideshow) {
//       window.initSlideshow();
//     }
//   };

//   return () => {
//     document.body.removeChild(script);
//   };
// }, []); // 👈 this empty array is critical!

// const LandingPage: React.FC = () => {
//   return (
//     // <div className="home-container">
//     //   {/* <span>
//     //       <Logout>
//     //         Logout <AuthorizedUser value="email" />
//     //       </Logout>
//     //     </span> */}
//       <Slideshow />
//     //   {/* <div className="content">
//     //     <Recommender Id={1} Name="Whats Popular" />
//     //     <Recommender Id={2} Name="Editor Picks" />
//     //   </div>
//     // </div> */}
//   );
// };

// export default LandingPage;
