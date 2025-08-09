import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import QRLogin from './components/QRLogin';
import StoreDashboard from './components/StoreDashboard';
import { VscTools } from "react-icons/vsc";
import { GrUserWorker } from "react-icons/gr";

// 📌 Helper Function: QR Code Scanner
const scanQRCode = async (webcamRef, callback) => {
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
    if (code) callback(code.data);
  }
};

// 📌 Dashboard for Operator
const Dashboard = () => {
  const navigate = useNavigate();
  const time = new Date().toLocaleString();
  const operatorId = localStorage.getItem('operatorId');

  return (
    <div className="min-h-screen bg-[#b8cfce] px-4 py-6 relative">
      
      {/* 🏷️ Company Branding */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img src="/logo.png" alt="TooliQ Logo" className="w-8 h-8" />
        <span className="text-xl font-extrabold text-[#333446] tracking-wide">TooliQ</span>
      </div>

      {/* 🎯 Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#b8cfce] px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <GrUserWorker className="text-[#333446]" size={24} />
            Welcome, {operatorId || 'Operator'}!
          </h1>

          <p className="text-sm text-gray-600 mb-6">
            Current Time: <span className="font-semibold">{time}</span>
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/issue')}
              className="w-full bg-[#339999] hover:bg-[#006666] text-white py-2 rounded-lg text-lg font-medium shadow transition duration-300 flex items-center justify-center gap-2"
            >
              <VscTools /> Issue Tool
            </button>

            <button
              onClick={() => navigate('/return')}
              className="w-full bg-[#58617a] hover:bg-[#2e3a59] text-white py-2 rounded-lg text-lg font-medium shadow transition duration-300 flex items-center justify-center gap-2"
            >
              <VscTools /> Return Tool
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-8 py-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TooliQ. All rights reserved.
      </footer>
    </div>
  );
};

// 📌 Issue Tool Page
// 📌 Issue Tool Page
const IssueTool = () => {
  const navigate = useNavigate();
  const [tool, setTool] = useState('');
  const [machine, setMachine] = useState('Lathe');
  const [qrScanned, setQrScanned] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!qrScanned) {
        scanQRCode(webcamRef, (data) => {
          setTool(data);        // Tool value is now set from QR
          setQrScanned(true);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [qrScanned]);

  const handleIssue = () => {
    if (!tool) {
      alert('Please scan a tool QR or select manually.');
      return;
    }
    alert(`✅ Tool "${tool}" issued for machine "${machine}".`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#b8cfce] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
  <VscTools /> Issue Tool
</h2>


        {!qrScanned && (
          <div className="mb-4">
            <Webcam ref={webcamRef} screenshotFormat="image/png" width="100%" />
            <p className="text-sm text-gray-600 mt-2">Scan tool QR or select manually</p>
          </div>
        )}

        <div className="text-left space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tool</label>
            <div className="w-full p-2 border border-gray-300 rounded bg-gray-100">
              {tool || 'Waiting for QR...'}
            </div>
          </div>
        <div className="absolute top-4 left-4 flex items-center gap-2">
        <img src="/logo.png" alt="TooliQ Logo" className="w-8 h-8" />
        <span className="text-xl font-extrabold text-[#333446] tracking-wide">TooliQ</span>
      </div>
          {/* Optional Manual Selection if QR Fails */}
          {!tool && (
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-400"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
            >
              <option value="">-- Select Tool --</option>
              <option>Hammer</option>
              <option>Spanner</option>
              <option>Screwdriver</option>
            </select>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Machine</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-400"
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
            >
              <option>Lathe</option>
              <option>Milling</option>
              <option>Drill</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleIssue}
          className="mt-6 w-full bg-[#04897e] hover:bg-[#036a62] text-white py-3 rounded-lg text-lg font-medium shadow transition duration-300"
        >
          Confirm
        </button>
        <footer className="mt-8 py-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TooliQ. All rights reserved.
      </footer>
      </div>
    </div>
  );
};


// 📌 Return Tool Page
// 📌 Return Tool Page
const ReturnTool = () => {
  const navigate = useNavigate();
  const [condition, setCondition] = useState('');
  const [tool, setTool] = useState('');
  const [qrScanned, setQrScanned] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!qrScanned) {
        scanQRCode(webcamRef, (data) => {
          setTool(data);          // Set tool from QR scan
          setQrScanned(true);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [qrScanned]);

  const handleReturn = () => {
    const time = new Date().toLocaleTimeString();

    if (!tool) {
      alert('❗ Please scan or select a tool before returning.');
      return;
    }

    if (!condition || condition === '') {
      alert('❗ Please select the condition of the tool.');
      return;
    }

    alert(`🔁 Tool "${tool}" returned in "${condition}" condition at ${time}.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#d7e2e2] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
  <VscTools /> Return Tool
</h2>


        {!qrScanned && (
          <div className="mb-4">
            <Webcam ref={webcamRef} screenshotFormat="image/png" width="100%" />
            <p className="text-sm text-gray-600 mt-2">Scan tool QR or select manually</p>
          </div>
        )}

        <div className="text-left space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tool</label>
            <div className="w-full p-2 border border-gray-300 rounded bg-gray-100">
              {tool || 'Waiting for QR...'}
            </div>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-2">
        <img src="/logo.png" alt="TooliQ Logo" className="w-8 h-8" />
        <span className="text-xl font-extrabold text-[#333446] tracking-wide">TooliQ</span>
      </div>

          {/* Optional Manual Selection if QR not scanned */}
          {!tool && (
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#58617a]"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
            >
              <option value="">-- Select Tool --</option>
              <option>Hammer</option>
              <option>Spanner</option>
              <option>Screwdriver</option>
            </select>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Condition</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#58617a]"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">-- Select Condition --</option>
              <option>Good</option>
              <option>Worn</option>
              <option>Damaged</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleReturn}
          className="mt-6 w-full bg-[#58617a] hover:bg-[#2e3a59] text-white py-3 rounded-lg text-lg font-medium shadow transition duration-300"
        >
          Confirm
        </button>
        
      </div>
    </div>
    
  );
};


// 📌 Main App Component with All Routes
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<QRLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/store-dashboard" element={<StoreDashboard />} />
      <Route path="/issue" element={<IssueTool />} />
      <Route path="/return" element={<ReturnTool />} />
    </Routes>
  </Router>
);

export default App;
