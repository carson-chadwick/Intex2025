import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

  const loginUrl = `${import.meta.env.VITE_API_URL}/auth/signin`;



    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe: rememberme }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <>
      <Header/>
      <div className="container">
        <div className="row">
          <div className="card border-0 shadow rounded-3 ">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberme"
                    name="rememberme"
                    checked={rememberme}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberme">
                    Remember password
                  </label>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-google btn-login text-uppercase fw-bold"
                    type="button"
                  >
                    <i className="fa-brands fa-google me-2"></i> Sign in with
                    Google
                  </button>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-facebook btn-login text-uppercase fw-bold"
                    type="button"
                  >
                    <i className="fa-brands fa-facebook-f me-2"></i> Sign in with
                    Facebook
                  </button>
                </div>
              </form>
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>

  );
}

export default LoginPage;
