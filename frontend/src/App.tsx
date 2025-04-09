import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AuthorizeView from './components/AuthorizeView';
import MyListPage from './pages/MyListPage';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import MovieDetailPage from './pages/MovieDetailPage';
import PrivacyPage from './pages/PrivacyPageLoggedIn';
import AccountPage from './pages/AccountPage';
import PrivacyPageLoggedOut from './pages/PrivacyPageLoggedOut';
import PrivacyPageLoggedIn from './pages/PrivacyPageLoggedIn';
import AllMoviesPage from './pages/AllMoviesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Unprotected routes */}
        <Route path="/LandingPage" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/PrivacyPageLoggedOut" element={<PrivacyPageLoggedOut/>} />
        
        {/* Protected routes */}
        <Route path="/HomePage" element={<AuthorizeView><HomePage/></AuthorizeView>} />
        <Route path="/MyListPage" element={<AuthorizeView><MyListPage/></AuthorizeView>} />
        <Route path="/AdminPage" element={<AuthorizeView><AdminPage/></AuthorizeView>} />
        <Route path="/" element={<AuthorizeView><HomePage/></AuthorizeView>} />
        <Route path="/AllMoviesPage" element={<AuthorizeView><AllMoviesPage/></AuthorizeView>} />
        <Route path="/MovieDetailPage/:showId" element={<AuthorizeView><MovieDetailPage/></AuthorizeView>} />
        {/* Todo: Eventually pass in the userId to the account page */}
        <Route path="/AccountPage" element={<AuthorizeView><AccountPage/></AuthorizeView>} />
        <Route path="/PrivacyPageLoggedIn" element={<AuthorizeView><PrivacyPageLoggedIn/></AuthorizeView>} />
      </Routes>
    </Router>
  );
}

export default App;
