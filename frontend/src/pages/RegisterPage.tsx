import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LoginPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string>('');

  // Step 1
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);

  // Step 2
  const [fullName, setFullName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Step 3
  const [success, setSuccess] = useState<boolean>(false);

  const handleNextStep = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password.length < 12) {
      setError('Password must be at least 12 characters long.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!isPrivacyChecked) {
      setError('You must agree to the privacy policy.');
    } else {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !gender || !age || !phone) {
      setError('Please complete all fields.');
      return;
    }

    const payload = {
      email,
      password,
      fullName,
      gender,
      age,
      phone,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentLength = response.headers.get('content-length');
      const hasBody = contentLength && parseInt(contentLength) > 0;
      const data = hasBody ? await response.json() : null;

      if (response.ok) {
        setSuccess(true);
        setError('');
      } else {
        setError(data?.message || 'Registration failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred.');
    }
  };

  return (
    <>
      <Header />
      <div className="apply-margin-login"></div>
      <div className="login-container">
        <div className="login-card register-card shadow">
          <div className="step-indicator mb-4">
            <div className={`step ${step >= 1 ? 'filled' : ''}`}>
              <div className="bubble">{step > 1 ? '✔' : '1'}</div>
              <p>Account Info</p>
            </div>
            <div className="line" />
            <div className={`step ${step === 2 || success ? 'filled' : ''}`}>
              <div className="bubble">{success ? '✔' : '2'}</div>
              <p>Personal Details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {!success ? (
              <>
                {step === 1 && (
                  <>
                    <h3 className="mb-3">Step 1: Account Info</h3>
                    <input
                      className="form-control my-2"
                      placeholder="Email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    <input
                      className="form-control my-2"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    {password.length > 0 && (
                      <p
                        style={{
                          color: password.length >= 12 ? 'green' : 'red',
                          marginTop: '-8px',
                          marginBottom: '8px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {password.length >= 12
                          ? 'Password length is sufficient'
                          : 'Password must be at least 12 characters'}
                      </p>
                    )}

                    <input
                      className="form-control my-2"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPassword.length > 0 && (
                      <p
                        style={{
                          color: confirmPassword === password ? 'green' : 'red',
                          marginTop: '-8px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {confirmPassword === password
                          ? 'Passwords match'
                          : 'Passwords do not match'}
                      </p>
                    )}

                    <div className="form-check my-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isPrivacyChecked}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setIsPrivacyChecked(e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label"
                        style={{
                          textAlign: 'left',
                          display: 'block',
                          color: '#000',
                        }}
                      >
                        I agree to the{' '}
                        <a href="/PrivacyPageLoggedOut" target="_blank">
                          privacy policy
                        </a>
                        .
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-login mt-2"
                      onClick={handleNextStep}
                    >
                      Continue
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="mb-3">Step 2: Personal Details</h3>
                    <input
                      className="form-control my-2"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFullName(e.target.value)
                      }
                    />
                    <select
                      className="form-control my-2"
                      value={gender}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGender(e.target.value)
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                    <input
                      className="form-control my-2"
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAge(e.target.value)
                      }
                    />
                    <input
                      className="form-control my-2"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhone(e.target.value)
                      }
                    />

                    <div className="d-flex justify-content-between mt-3">
                      <button
                        type="button"
                        className="btn btn-login"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn btn-login">
                        Register
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-center">
                <h4 className="text-success">Successfully Registered!</h4>
                <button
                  className="btn btn-login mt-3"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </button>
              </div>
            )}

            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      </div>
      <div className="apply-margin-login"></div>
      <Footer />
    </>
  );
}

export default RegisterPage;

