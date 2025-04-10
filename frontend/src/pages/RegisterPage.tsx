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

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err: any) {
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
        </form>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer';
// import Header from '../components/Header';

// function Register() {
//   //navigation stuff
//   const handleNavigation = (path: string) => {
//     navigate(path);
//   };


//   // state variables for email and passwords
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
//   const navigate = useNavigate();

//   // state variable for error messages
//   const [error, setError] = useState('');

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   // handle change events for input fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === 'email') setEmail(value);
//     if (name === 'password') setPassword(value);
//     if (name === 'confirmPassword') setConfirmPassword(value);
//   };

//   // handle change for the checkbox
//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIsPrivacyChecked(e.target.checked);
//   };

//   // handle submit event for the form
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // validate email and passwords
//     if (!email || !password || !confirmPassword) {
//       setError('Please fill in all fields.');
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError('Please enter a valid email address.');
//     } else if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//     } else if (!isPrivacyChecked) {
//       setError('Must comply with the Privacy Policy.');
//     } else {
//       // clear error message
//       setError('');
//       const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
//       // post data to the /register api
//       fetch(`${apiUrl}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           // handle success or error from the server
//           console.log(data);
//           if (data.ok) setError('Successful registration. Please log in.');
//           else setError('Error registering.');
//         })
//         .catch((error) => {
//           // handle network error
//           console.error(error);
//           setError('Error registering.');
//         });
//     }
//   };

//   return (
//     <>
//       <Header/>
//       <div className='apply-margin'></div>
//       <div className="container">
//         <div className="row">
//           <div className="card border-0 shadow rounded-3 ">
//             <div className="card-body p-4 p-sm-5">
//               <h5 className="card-title text-center mb-5 fw-light fs-5">
//                 Register
//               </h5>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-floating mb-3">
//                   <input
//                     className="form-control"
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={email}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="email">Email address</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input
//                     className="form-control"
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={password}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="password">Password</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input
//                     className="form-control"
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={confirmPassword}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="confirmPassword">Confirm Password</label>
//                 </div>

//                 {/* Privacy Policy stuff */}
//                 <div className="form-check mb-3">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="privacyPolicy"
//                     checked={isPrivacyChecked}
//                     onChange={handleCheckboxChange}
//                     //Todo: require user to check this box before registering
//                   />
//                   <label className="form-check-label" style={{ textAlign: 'left', display: 'block' }} htmlFor="rememberme">
//                     I have read and comply with the <a style={{ textDecoration: 'underline' }} onClick={() => window.open('/PrivacyPageLoggedOut', '_blank')}>privacy policy.</a>
//                   </label>
//                 </div>



//                 <div className="d-grid mb-2">
//                   <button
//                     className="btn btn-primary btn-login text-uppercase fw-bold"
//                     type="submit"
//                   >
//                     Register
//                   </button>
//                 </div>
//                 <div className="d-grid mb-2">
//                   <button
//                     className="btn btn-primary btn-login text-uppercase fw-bold"
//                     onClick={handleLoginClick}
//                   >
//                     Go to sign In
//                   </button>
//                 </div>
//               </form>
//               <strong>{error && <p className="error text-danger mt-3">{error}</p>}</strong>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </>
 
//   );
// }

// export default Register;
