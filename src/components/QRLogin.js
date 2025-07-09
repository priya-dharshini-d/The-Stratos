import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const QRLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [scannedID, setScannedID] = useState(null);
  const [showFallback, setShowFallback] = useState(false);

  const handleScan = async (text) => {
    if (text && !scannedID) {
      setScannedID(text);
      const email = `${text}@example.com`;
      const password = 'defaultOperatorPassword'; // default password for QR-based login

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } catch (err) {
        setError('🔒 Invalid QR or account not found.');
        setShowFallback(true); // fallback to email login
      }
    }
  };

  const handleFallbackLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Email/password login failed.');
    }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-teal-50 to-teal-300 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔐 Operator QR Login</h2>
        <p className="text-sm text-gray-600 mb-4">Show your ID QR code to the camera</p>

        {!showFallback && (
          <>
            <QrReader
              onResult={(result, error) => {
                if (!!result) handleScan(result?.text);
                if (!!error) console.warn(error);
              }}
              constraints={{ facingMode: 'environment' }}
              style={{ width: '100%' }}
            />
            <button
              onClick={() => setShowFallback(true)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              QR not available? Login with Email
            </button>
          </>
        )}

        {showFallback && (
          <form onSubmit={handleFallbackLogin} className="mt-4 text-left space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#04897e] hover:bg-[#036a62] text-white py-2 rounded shadow"
            >
              Login
            </button>
          </form>
        )}

        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default QRLogin;
