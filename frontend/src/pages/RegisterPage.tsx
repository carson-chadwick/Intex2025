import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Step 1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  // Step 2
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');


  // Step 3
  const [success, setSuccess] = useState(false);


  const handleNextStep = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (!isPrivacyChecked) {
      setError('You must agree to the privacy policy.');
    } else {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        // navigate('/login');
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
      <div className="container my-5">
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'filled' : ''}`}>
            <div className="bubble">{step > 1 ? '✔' : '1'}</div>
            <p>Account Info</p>
          </div>
          <div className="line" />
          <div className={`step ${step === 2 ? 'filled' : ''}`}>
            <div className="bubble">{step === 2 ? '2' : ''}</div>
            <p>Personal Details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {!success ? (
          <>
            {step === 1 && (
              <>
                <h3>Step 1: Account Info</h3>
                <input className="form-control my-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="form-control my-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input className="form-control my-2" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <div className="form-check my-2">
                  <input className="form-check-input" type="checkbox" checked={isPrivacyChecked} onChange={e => setIsPrivacyChecked(e.target.checked)} />
                  <label className="form-check-label" style={{ textAlign: 'left', display: 'block' }}>
                    I agree to the <a href="/PrivacyPageLoggedOut" target="_blank">privacy policy</a>.
                  </label>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleNextStep}>Continue</button>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Step 2: Personal Details</h3>
                <input className="form-control my-2" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                <select className="form-control my-2" value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <input className="form-control my-2" type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                <input className="form-control my-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />

                <div className="d-flex justify-content-between mt-3">
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn btn-success">Register</button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center">
            <h4 className="text-success">✅ Successfully Registered!</h4>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        )}

        {error && <p className="text-danger mt-3">{error}</p>}
      </form>


        {/* <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          {step === 1 && (
            <>
              <h3>Step 1: Account Info</h3>
              <input className="form-control my-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input className="form-control my-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <input className="form-control my-2" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <div className="form-check my-2">
                <input className="form-check-input" type="checkbox" checked={isPrivacyChecked} onChange={e => setIsPrivacyChecked(e.target.checked)} />
                <label className="form-check-label" style={{ textAlign: 'left', display: 'block' }}>
                  I agree to the <a href="/PrivacyPageLoggedOut" target="_blank">privacy policy</a>.
                </label>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleNextStep}>Continue</button>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Step 2: Personal Details</h3>
              <input className="form-control my-2" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
              <select className="form-control my-2" value={gender} onChange={e => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <input className="form-control my-2" type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
              <input className="form-control my-2" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />

              <div className="d-flex justify-content-between mt-3">
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="btn btn-success">Register</button>
              </div>
            </>
          )}

          {error && <p className="text-danger mt-3">{error}</p>}
        </form> */}
      </div>
      <Footer />
    </>
  )
}

export default RegisterPage;
