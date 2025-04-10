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
import AccountPage from './pages/AccountPage';
import PrivacyPageLoggedOut from './pages/PrivacyPageLoggedOut';
import PrivacyPageLoggedIn from './pages/PrivacyPageLoggedIn';
import AllMoviesPage from './pages/AllMoviesPage';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <Router>
      <Routes>
        {/* Unprotected routes */}
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/PrivacyPageLoggedOut"
          element={<PrivacyPageLoggedOut />}
        />

        {/* Protected routes */}
        <Route
          path="/HomePage"
          element={
            <AuthorizeView>
              <HomePage />
            </AuthorizeView>
          }
        />
        <Route
          path="/MyListPage"
          element={
            <AuthorizeView>
              <MyListPage />
            </AuthorizeView>
          }
        />
        <Route
          path="/AdminPage"
          element={
            <AuthorizeView>
              <AdminPage />
            </AuthorizeView>
          }
        />
        <Route
          path="/"
          element={
            <AuthorizeView>
              <HomePage />
            </AuthorizeView>
          }
        />
        <Route
          path="/AllMoviesPage"
          element={
            <AuthorizeView>
              <AllMoviesPage />
            </AuthorizeView>
          }
        />
        <Route
          path="/MovieDetailPage/:showId"
          element={
            <AuthorizeView>
              <MovieDetailPage />
            </AuthorizeView>
          }
        />
        {/* Todo: Eventually pass in the userId to the account page */}
        <Route
          path="/AccountPage"
          element={
            <AuthorizeView>
              <AccountPage />
            </AuthorizeView>
          }
        />
        <Route
          path="/PrivacyPageLoggedIn"
          element={
            <AuthorizeView>
              <PrivacyPageLoggedIn />
            </AuthorizeView>
          }
        />
      </Routes>
      {/* 👇 Cookie consent banner shown on all pages */}
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="IntexCookieConsent"
        style={{ background: '#0c0c0e' }}
        contentStyle={{
          margin: '0 auto',
          textAlign: 'left',
          width: '100%',
          maxWidth: '1200px',
        }}
        buttonStyle={{
          color: 'white',
          background: '#0c0c0e',
          fontSize: '13px',
          borderRadius: '5px',
          padding: '10px 20px',
          border: 'none',
        }}
        buttonClasses="cookie-btn"
        expires={150}
      >
          ⚠️ This website uses cookies to enhance the user experience.
      </CookieConsent>
    </Router>
  );
}

export default App;
