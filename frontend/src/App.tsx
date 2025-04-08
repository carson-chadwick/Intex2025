import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AuthorizeView from './components/AuthorizeView';
import Header from './components/Header';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected route */}
        <Route
          element={
            <AuthorizeView>
              <Header />
            </AuthorizeView>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:showId" element={<MovieDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
