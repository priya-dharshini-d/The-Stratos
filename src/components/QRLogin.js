import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import { GrUserWorker } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";

const QRLogin = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [scanned, setScanned] = useState(false);
  const [mode, setMode] = useState('operator'); // 'operator' or 'storekeeper'

  const scanQRCode = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code && !scanned) {
        const userId = code.data.trim();
        const email =
          mode === 'operator'
            ? `${userId}@example.com`
            : `${userId}@store.com`;
        const password = mode === 'operator' ? 'operator123' : 'store12345';

        setScanned(true);

        try {
          await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem('operatorId', userId);
          localStorage.setItem('role', mode);
          navigate(mode === 'operator' ? '/dashboard' : '/store-dashboard');
        } catch (err) {
          console.error(err);
          setError('❌ QR Login failed. Invalid credentials.');
          setScanned(false);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(scanQRCode, 1000);
    return () => clearInterval(interval);
  }, [mode, scanned]);

  return (
    <div className="min-h-screen bg-[#b8cfce] flex flex-col items-center justify-center px-4 py-10 font-sans relative">
      {/* 🚀 Logo + Brand Top-Left */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img src="/logo.png" alt="TooliQ Logo" className="w-8 h-8" />
        <span className="text-xl font-extrabold text-[#333446] tracking-wide">TooliQ</span>
      </div>

      {/* 🔐 Login Box */}
      <div className="bg-[#eaefef] rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-[#7f8caa]">
        <h2 className="text-3xl font-extrabold text-[#333446] mb-3 tracking-tight flex justify-center items-center gap-2">
          {mode === 'operator' ? (
            <>
              <GrUserWorker className="text-[#58617a]" size={28} />
              Operator QR Login
            </>
          ) : (
            <>
              <IoPersonSharp className="text-[#58617a]" size={28} />
              Storekeeper QR Login
            </>
          )}
        </h2>

        <p className="text-sm text-[#58617a] mb-6">
          {mode === 'operator'
            ? 'Scan your Operator ID QR code to continue'
            : 'Scan your Storekeeper QR code to login'}
        </p>

        <div className="overflow-hidden rounded-xl border-2 border-dashed border-[#7f8caa] shadow-inner">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            width="100%"
            className="rounded-md"
            videoConstraints={{ facingMode: 'environment' }}
          />
        </div>

        {error && <p className="text-red-600 mt-4 text-sm font-medium">{error}</p>}

        <button
          className="mt-6 text-sm text-[#3a5a77] underline hover:text-[#1b2a41]"
          onClick={() => {
            setMode(mode === 'operator' ? 'storekeeper' : 'operator');
            setError('');
            setScanned(false);
          }}
        >
          {mode === 'operator'
            ? 'Switch to Storekeeper Login'
            : 'Switch to Operator Login'}
        </button>
      </div>
      <footer className="mt-8 py-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TooliQ. All rights reserved.
      </footer>
    </div>
  );
};

export default QRLogin;
