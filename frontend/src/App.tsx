import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AuthorizeView from './components/AuthorizeView';
import Header from './components/Header';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected route */}
        <Route
          path="/"
          element={
            <AuthorizeView>
              <Header/>
              <HomePage/>
            </AuthorizeView>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
