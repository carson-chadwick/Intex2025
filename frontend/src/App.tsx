import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AuthorizeView from './components/AuthorizeView';
import Header from './components/Header';
import MyListPage from './pages/MyListPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/MyListPage" element={<MyListPage/>} />
        <Route path="/AdminPage" element={<AdminPage/>} />
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
