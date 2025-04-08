import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AuthorizeView from './components/AuthorizeView';
import Header from './components/Header';
import MyListPage from './pages/MyListPage';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Unprotected routes */}
        <Route path="/LandingPage" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        
        {/* Protected routes */}
        <Route path="/HomePage" element={<AuthorizeView><HomePage/></AuthorizeView>} />
        <Route path="/MyListPage" element={<AuthorizeView><MyListPage/></AuthorizeView>} />
        <Route path="/AdminPage" element={<AuthorizeView><AdminPage/></AuthorizeView>} />
        <Route path="/" element={<AuthorizeView><HomePage/></AuthorizeView>} />
      </Routes>
    </Router>
  );
}

export default App;
