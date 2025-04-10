import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Register() {
  //navigation stuff
  (path: string) => {
    navigate(path);
  };


  // state variables for email and passwords
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const navigate = useNavigate();

  // state variable for error messages
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    navigate('/login');
  };

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // handle change for the checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivacyChecked(e.target.checked);
  };

  // handle submit event for the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate email and passwords
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!isPrivacyChecked) {
      setError('Must comply with the Privacy Policy.');
    } else {
      // clear error message
      setError('');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      // post data to the /register api
      fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // handle success or error from the server
          console.log(data);
          if (data.ok) setError('Successful registration. Please log in.');
          else setError('Error registering.');
        })
        .catch((error) => {
          // handle network error
          console.error(error);
          setError('Error registering.');
        });
    }
  };

  return (
    <>
      <Header/>
      <div className='apply-margin'></div>
      <div className="container">
        <div className="row">
          <div className="card border-0 shadow rounded-3 ">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Register
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
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>

                {/* Privacy Policy stuff */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="privacyPolicy"
                    checked={isPrivacyChecked}
                    onChange={handleCheckboxChange}
                    //Todo: require user to check this box before registering
                  />
                  <label className="form-check-label" style={{ textAlign: 'left', display: 'block' }} htmlFor="rememberme">
                    I have read and comply with the <a style={{ textDecoration: 'underline' }} onClick={() => window.open('/PrivacyPageLoggedOut', '_blank')}>privacy policy.</a>
                  </label>
                </div>



                <div className="d-grid mb-2">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    onClick={handleLoginClick}
                  >
                    Go to sign In
                  </button>
                </div>
              </form>
              <strong>{error && <p className="error text-danger mt-3">{error}</p>}</strong>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
 
  );
}

export default Register;
