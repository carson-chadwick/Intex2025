import { useState } from 'react';
import QRCode from 'react-qr-code';
import Cookies from 'js-cookie';
import './MfaSetupPage.css';

// 🌐 Translations
const translations: Record<
  string,
  {
    title: string;
    enterEmail: string;
    generateQr: string;
    scanInstruction: string;
    enterCode: string;
    verifyCode: string;
    statusSuccess: string;
    statusInvalid: string;
    statusFail: string;
    statusFetchFail: string;
  }
> = {
  en: {
    title: 'Set Up Multi-Factor Authentication',
    enterEmail: 'Enter your email',
    generateQr: 'Generate QR Code',
    scanInstruction:
      'Scan this code using your MFA app (Google Authenticator, etc).',
    enterCode: 'Enter 6-digit code',
    verifyCode: 'Verify Code',
    statusSuccess: '✅ MFA setup complete!',
    statusInvalid: '❌ Invalid code. Try again.',
    statusFail: '❌ Verification failed.',
    statusFetchFail: '❌ Failed to fetch setup data.',
  },
  es: {
    title: 'Configurar la Autenticación Multifactor',
    enterEmail: 'Ingresa tu correo electrónico',
    generateQr: 'Generar código QR',
    scanInstruction:
      'Escanea este código con tu aplicación MFA (Google Authenticator, etc).',
    enterCode: 'Ingresa el código de 6 dígitos',
    verifyCode: 'Verificar código',
    statusSuccess: '✅ ¡Configuración MFA completada!',
    statusInvalid: '❌ Código inválido. Inténtalo de nuevo.',
    statusFail: '❌ Falló la verificación.',
    statusFetchFail: '❌ Error al obtener los datos de configuración.',
  },
};

function MfaSetup() {
  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

  const [email, setEmail] = useState('');
  const [qrCodeUri, setQrCodeUri] = useState('');
  const [_sharedKey, setSharedKey] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  const handleSetup = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/mfa/setup?email=${email}`
      );
      const data = await res.json();
      setQrCodeUri(data.qrCodeUri);
      setSharedKey(data.sharedKey);
      setStatus('');
    } catch (err) {
      setStatus(t.statusFetchFail);
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
        setStatus(t.statusSuccess);
      } else {
        setStatus(t.statusInvalid);
      }
    } catch (err) {
      setStatus(t.statusFail);
    }
  };

  return (
    <div className="mfa-card">
      <h2 className="mfa-title">{t.title}</h2>

      <input
        type="email"
        placeholder={t.enterEmail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mfa-input"
      />

      <button onClick={handleSetup} className="mfa-button primary">
        {t.generateQr}
      </button>

      {qrCodeUri && (
        <>
          <div className="mfa-qr">
            <QRCode value={qrCodeUri} />
          </div>
          <p className="mfa-instruction">{t.scanInstruction}</p>

          <input
            type="text"
            placeholder={t.enterCode}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mfa-input"
          />

          <button onClick={handleVerify} className="mfa-button success">
            {t.verifyCode}
          </button>
        </>
      )}

      {status && (
        <p
          className={`mfa-status ${status.startsWith('✅') ? 'success' : 'error'}`}
        >
          {status}
        </p>
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
