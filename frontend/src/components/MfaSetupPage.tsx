// MfaSetupPage.tsx
import { useState } from 'react';
import QRCode from 'react-qr-code';
import './MfaSetupPage.css';

function MfaSetup() {
  const [email, setEmail] = useState('');
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [_sharedKey, setSharedKey] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  const handleSetup = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/mfa/setup?email=${email}`);
      const data = await res.json();
      setQrCodeUri(data.qrCodeUri);
      setSharedKey(data.sharedKey);
      setStatus('');
    } catch (err) {
      setStatus('❌ Failed to fetch setup data.');
    }
  };

  const handleVerify = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/mfa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        setStatus('✅ MFA setup complete!');
      } else {
        setStatus('❌ Invalid code. Try again.');
      }
    } catch (err) {
      setStatus('❌ Verification failed.');
    }
  };

  return (
    <div className="mfa-card">
      <h2 className="mfa-title">Set Up Multi-Factor Authentication</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mfa-input"
      />

      <button onClick={handleSetup} className="mfa-button primary">
        Generate QR Code
      </button>

      {qrCodeUri && (
        <>
          <div className="mfa-qr">
            <QRCode value={qrCodeUri} />
          </div>
          <p className="mfa-instruction">
            Scan this code using your MFA app (Google Authenticator, etc).
          </p>

          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mfa-input"
          />

          <button onClick={handleVerify} className="mfa-button success">
            Verify Code
          </button>
        </>
      )}

      {status && (
        <p className={`mfa-status ${status.startsWith('✅') ? 'success' : 'error'}`}>{status}</p>
      )}
    </div>
  );
}

export default MfaSetup;

// import { useState } from 'react';
// import QRCode from 'react-qr-code';

// function MfaSetup() {
//   const [email, setEmail] = useState('');
//   const [qrCodeUri, setQrCodeUri] = useState('');
//   const [_sharedKey, setSharedKey] = useState('');
//   const [code, setCode] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSetup = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/mfa/setup?email=${email}`
//       );
//       const data = await res.json();
//       setQrCodeUri(data.qrCodeUri);
//       setSharedKey(data.sharedKey);
//       setStatus('');
//     } catch (err) {
//       setStatus('❌ Failed to fetch setup data.');
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/mfa/verify`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, code }),
//       });

//       if (res.ok) {
//         setStatus('✅ MFA setup complete!');
//       } else {
//         setStatus('❌ Invalid code. Try again.');
//       }
//     } catch (err) {
//       setStatus('❌ Verification failed.');
//     }
//   };

//   return (
//     <div className="mt-10 p-6 border shadow rounded-md text-center max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">
//         Set Up Multi-Factor Authentication
//       </h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border px-3 py-2 w-full mb-3 rounded"
//       />
//       <button
//         onClick={handleSetup}
//         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full mb-4 transition">
//         Generate QR Code
//       </button>
//       {/* <button onClick={handleSetup} className="btn btn-primary mb-4">
//         Generate QR Code
//       </button> */}

//       {qrCodeUri && (
//         <>
//           <div className="mb-4">
//             <QRCode value={qrCodeUri} />
//           </div>
//           <p className="mb-4">
//             Scan this code using your MFA app (Google Authenticator, etc).
//           </p>
//           <input
//             type="text"
//             placeholder="Enter 6-digit code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="border px-3 py-2 w-full mb-3 rounded"
//           />
//           <button
//             onClick={handleVerify}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full transition">
//             Verify Code
//           </button>
//           {/* <button onClick={handleVerify} className="btn btn-success">
//             Verify Code
//           </button> */}
//         </>
//       )}

//       {status && <p className="mt-4 text-sm">{status}</p>}
//     </div>
//   );
// }

// export default MfaSetup;
