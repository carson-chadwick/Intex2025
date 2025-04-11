import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import './LoginPage.css';

const translations: Record<
  string,
  {
    signIn: string;
    mfa: string;
    verifyCode: string;
    mfaPrompt: string;
    email: string;
    password: string;
    remember: string;
    noAccount: string;
    signInWithGoogle: string;
    signInWithFacebook: string;
    errorFillFields: string;
    mfaCodeLabel: string;
  }
> = {
  en: {
    signIn: 'Sign In',
    mfa: 'Multi-Factor Authentication',
    verifyCode: 'Verify Code',
    mfaPrompt: 'Enter your 6-digit MFA code:',
    email: 'Email address',
    password: 'Password',
    remember: 'Remember password',
    noAccount: "Don't have an account?",
    signInWithGoogle: 'Sign in with Google',
    signInWithFacebook: 'Sign in with Facebook',
    errorFillFields: 'Please fill in all fields.',
    mfaCodeLabel: 'MFA Code',
  },
  es: {
    signIn: 'Iniciar sesión',
    mfa: 'Autenticación multifactor',
    verifyCode: 'Verificar código',
    mfaPrompt: 'Introduce tu código MFA de 6 dígitos:',
    email: 'Correo electrónico',
    password: 'Contraseña',
    remember: 'Recordar contraseña',
    noAccount: '¿No tienes una cuenta?',
    signInWithGoogle: 'Iniciar sesión con Google',
    signInWithFacebook: 'Iniciar sesión con Facebook',
    errorFillFields: 'Por favor, complete todos los campos.',
    mfaCodeLabel: 'Código MFA',
  },
};

function LoginPage() {
  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [requiresMfa, setRequiresMfa] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t.errorFillFields);
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      if (data.requiresMfa) {
        setRequiresMfa(true);
        return;
      }

      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
    }
  };

  const handleMfaSubmit = async () => {
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/mfa/challenge`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: mfaCode }),
      });

      if (res.ok) {
        navigate('/');
      } else {
        const data = await res.text();
        throw new Error(data || 'Invalid MFA code.');
      }
    } catch (error: any) {
      setError(error.message || 'Failed MFA challenge.');
    }
  };

  return (
    <>
      <Header />

      <div className="apply-margin-login"></div>
      <div className="login-container">
        <div className="login-card shadow">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              {requiresMfa ? t.mfa : t.signIn}
            </h5>
            <form
              onSubmit={
                requiresMfa
                  ? (e) => {
                      e.preventDefault();
                      handleMfaSubmit();
                    }
                  : handleSubmit
              }
            >
              {!requiresMfa ? (
                <>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">{t.email}</label>
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
                    <label htmlFor="password">{t.password}</label>
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
                    <label
                      className="form-check-label"
                      style={{ textAlign: 'left', display: 'block' }}
                      htmlFor="rememberme"
                    >
                      {t.remember}
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-3">{t.mfaPrompt}</p>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="mfaCode"
                      name="mfaCode"
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      placeholder="123456"
                    />
                    <label htmlFor="mfaCode">{t.mfaCodeLabel}</label>
                  </div>
                </>
              )}

              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  {requiresMfa ? t.verifyCode : t.signIn}
                </button>
              </div>
              <a
                onClick={() => navigate('/register')}
                className="footer-text"
                role="button"
                style={{
                  cursor: 'pointer',
                  display: 'block',
                  marginTop: '10px',
                }}
              >
                {t.noAccount}
              </a>
            </form>
            <strong>
              {error && <p className="error text-danger mt-3">{error}</p>}
            </strong>
          </div>
        </div>
      </div>
      <div className="apply-margin-login"></div>
      <Footer />
    </>
  );
}

export default LoginPage;
