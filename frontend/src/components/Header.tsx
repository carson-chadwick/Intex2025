import React, { useContext } from 'react';
import './Header.css';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../images/cinenicheicon_720.png';
import { UserContext } from './AuthorizeView';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const user = useContext(UserContext);
  const isLoggedIn = !!user;

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {isLoggedIn ? (
        <header className="header">
          <div className="logo" onClick={() => handleNavigation('/HomePage')} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="CineNiche Logo" className="logo-img" />
          </div>

          <div className="header-right">
            <button className="btn" onClick={() => handleNavigation('/HomePage')}>Home</button>
            <button className="btn" onClick={() => handleNavigation('/MyListPage')}>My List</button>
            <button className="btn" onClick={() => handleNavigation('/AdminPage')}>Admin</button>
            <FaSearch className="icon" />
            <FaUserCircle className="icon profile-icon" />
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="logo">
            <img src={logo} alt="CineNiche Logo" className="logo-img" />
          </div>

          <div className="header-right">
            <FaUserCircle className="icon profile-icon" />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;

// import React, { useContext } from 'react';
// import './Header.css';
// import { FaSearch, FaUserCircle } from 'react-icons/fa';
// import logo from '../images/cinenicheicon_720.png';
// import { UserContext } from './AuthorizeView';
// // import { useNavigate } from 'react-router-dom';
// const Header: React.FC = () => {
//   const user = useContext(UserContext);
//   const isLoggedIn = !!user;

//   // const navigate = useNavigate();
//   // const handleNavigation = (path: string) => {
//   //   navigate(path);
//   // };

//   return (
//     <>
//       {isLoggedIn ? (
//         <header className="header">
//           <div className="logo">
//             <img src={logo} alt="CineNiche Logo" className="logo-img" />
//           </div>

//           <div className="header-right">
//             <button className="btn">Home</button>
//             <button className="btn">My List</button>
//             <button className="btn">Admin</button>
//             {/* <button className="btn" onClick={() => handleNavigation("./HomePage")}>Home</button>
//             <button className="btn" onClick={() => handleNavigation("./MyListPage")}>My List</button>
//             <button className="btn" onClick={() => handleNavigation("./AdminPage")}>Admin</button> */}
//             <FaSearch className="icon" />
//             <FaUserCircle className="icon profile-icon" />
//           </div>
//         </header>
//       ) : (
//         //Have this header be hidden when logged in
//         <header className="header">
//           <div className="logo">
//             <img src={logo} alt="CineNiche Logo" className="logo-img" />
//           </div>

//           <div className="header-right">
//             <FaUserCircle className="icon profile-icon" />
//           </div>
//         </header>
//       )}
//     </>
//   );
// };

// export default Header;

