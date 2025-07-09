import React, { useState } from 'react';
import QRLogin from './components/QRLogin';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<QRLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/issue" element={<IssueTool />} />
      <Route path="/return" element={<ReturnTool />} />
    </Routes>
  </Router>
);

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (id === '123' && pin === '456') navigate('/dashboard');
    else alert('Invalid credentials');
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-xl font-bold mb-4">QR Login (Fallback ID + PIN)</h1>
      <input placeholder="Operator ID" className="p-2 border mb-2" value={id} onChange={e => setId(e.target.value)} />
      <input placeholder="PIN" type="password" className="p-2 border mb-2" value={pin} onChange={e => setPin(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const time = new Date().toLocaleString();
  const operatorId = localStorage.getItem('operatorId'); // ✅ Get stored ID

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-300 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {operatorId || 'Unknown'}!
        </h1>
        <p className="text-sm text-gray-600 mb-6">Current Time: <span className="font-semibold">{time}</span></p>


        <div className="space-y-4">
          <button
            onClick={() => navigate('/issue')}
            className="w-full bg-[#339999] hover:bg-[#006666] text-white py-2 rounded-lg text-lg font-medium shadow transition duration-300"
          >
             Issue Tool
          </button>

          <button
            onClick={() => navigate('/return')}
            className="w-full bg-[#58617a] hover:bg-[#2e3a59] text-white py-2 rounded-lg text-lg font-medium shadow transition duration-300"
          >
             Return Tool
          </button>
        </div>
      </div>
    </div>
  );
};

const IssueTool = () => {
  const navigate = useNavigate();
  const [tool, setTool] = useState('Hammer');
  const [machine, setMachine] = useState('Lathe');

  const handleIssue = () => {
    alert(`Tool "${tool}" issued for machine "${machine}".`);
    navigate('/');

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-300 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Issue Tool</h2>

        <div className="text-left space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Tool</label>
            <select
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-400"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
            >
              <option>Hammer</option>
              <option>Spanner</option>
              <option>Screwdriver</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Machine</label>
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
      </div>
    </div>
  );
};


const ReturnTool = () => {
  const navigate = useNavigate();
  const [condition, setCondition] = useState('Good');

const handleReturn = () => {
  const time = new Date().toLocaleTimeString();
  alert(`Tool returned in "${condition}" condition at ${time}.`);
  navigate('/');
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-300 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Return Tool</h2>

        <div className="text-left">
          <label className="block mb-1 text-sm font-medium text-gray-700">Tool Condition</label>
          <select
            className="w-full p-2 mb-6 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option>Good</option>
            <option>Worn</option>
            <option>Damaged</option>
          </select>
        </div>

        <button
          onClick={handleReturn}
          className="w-full bg-[#58617a] hover:bg-[#2e3a59] text-white py-3 rounded-lg text-lg font-medium shadow transition duration-300"
        >
          Confirm 
        </button>
      </div>
    </div>
  );
};


export default App;
