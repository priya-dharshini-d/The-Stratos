import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLayout } from 'react-icons/fi';
import { HiOutlineLogout } from "react-icons/hi";
import { LuScanSearch } from "react-icons/lu";

const mockData = [
  { toolName: 'Drill 10mm', toolId: 'T001', issuedBy: 'Ravi', issueTime: '9:15 AM', returned: 'Yes', returnTime: '3:30 PM', condition: 'Good' },
  { toolName: 'Spanner Set', toolId: 'T002', issuedBy: 'Meena', issueTime: '10:45 AM', returned: 'No', returnTime: '-', condition: '-' },
  { toolName: 'Hammer', toolId: 'T003', issuedBy: 'Arun', issueTime: '8:20 AM', returned: 'Yes', returnTime: '1:00 PM', condition: 'Good' },
  { toolName: 'Welding Rod', toolId: 'T004', issuedBy: 'Kumar', issueTime: '11:30 AM', returned: 'Yes', returnTime: '4:00 PM', condition: 'Worn' },
  { toolName: 'Pliers', toolId: 'T005', issuedBy: 'Sneha', issueTime: '9:50 AM', returned: 'No', returnTime: '-', condition: '-' },
  { toolName: 'Grinder', toolId: 'T006', issuedBy: 'Ravi', issueTime: '10:10 AM', returned: 'Yes', returnTime: '3:00 PM', condition: 'Damaged' },
  { toolName: 'Lathe Tool', toolId: 'T007', issuedBy: 'Hari', issueTime: '7:30 AM', returned: 'Yes', returnTime: '12:00 PM', condition: 'Good' },
  { toolName: 'Screwdriver', toolId: 'T008', issuedBy: 'Anu', issueTime: '8:45 AM', returned: 'Yes', returnTime: '2:15 PM', condition: 'Good' },
  { toolName: 'Drill Bit', toolId: 'T009', issuedBy: 'Raj', issueTime: '10:00 AM', returned: 'No', returnTime: '-', condition: '-' },
  { toolName: 'Wrench', toolId: 'T010', issuedBy: 'Priya', issueTime: '11:20 AM', returned: 'Yes', returnTime: '5:00 PM', condition: 'Worn' },
  { toolName: 'Tape Measure', toolId: 'T011', issuedBy: 'Deepak', issueTime: '9:05 AM', returned: 'Yes', returnTime: '2:00 PM', condition: 'Good' },
  { toolName: 'Allen Keys', toolId: 'T012', issuedBy: 'Rani', issueTime: '9:40 AM', returned: 'No', returnTime: '-', condition: '-' },
  { toolName: 'Multimeter', toolId: 'T013', issuedBy: 'Naveen', issueTime: '10:30 AM', returned: 'Yes', returnTime: '1:30 PM', condition: 'Good' },
  { toolName: 'Chisel', toolId: 'T014', issuedBy: 'Nisha', issueTime: '8:30 AM', returned: 'Yes', returnTime: '12:45 PM', condition: 'Worn' },
  { toolName: 'Cutting Plier', toolId: 'T015', issuedBy: 'Satish', issueTime: '7:45 AM', returned: 'Yes', returnTime: '10:45 AM', condition: 'Good' },
  { toolName: 'Tool Kit', toolId: 'T016', issuedBy: 'Kavya', issueTime: '9:30 AM', returned: 'No', returnTime: '-', condition: '-' },
  { toolName: 'Grinder Disc', toolId: 'T017', issuedBy: 'Dinesh', issueTime: '10:15 AM', returned: 'Yes', returnTime: '4:20 PM', condition: 'Damaged' },
  { toolName: 'Torque Wrench', toolId: 'T018', issuedBy: 'Gokul', issueTime: '9:55 AM', returned: 'Yes', returnTime: '3:15 PM', condition: 'Good' },
  { toolName: 'Bench Vice', toolId: 'T019', issuedBy: 'Kiran', issueTime: '8:10 AM', returned: 'Yes', returnTime: '1:10 PM', condition: 'Good' },
  { toolName: 'Soldering Iron', toolId: 'T020', issuedBy: 'Radha', issueTime: '11:45 AM', returned: 'No', returnTime: '-', condition: '-' },
];

      
const StoreDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const filteredData = mockData.filter(row =>
    row.toolName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#d7e2e2] px-6 py-8 flex flex-col">
      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
        <img src="/logo.png" alt="TooliQ Logo" className="w-8 h-8" />
        <span className="text-xl font-extrabold text-[#333446] tracking-wide">TooliQ</span>
      </div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-extrabold text-[#333446] flex items-center gap-2">
          <FiLayout className="text-[#58617a]" size={28} />
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LuScanSearch size={18} className="text-[#58617a]" />
            <input
              type="text"
              placeholder="Search Tool Name..."
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7f8caa] outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogout}
            className="bg-[#58617a] hover:bg-[#2e3a59] text-white px-4 py-2 rounded-lg text-sm shadow flex items-center gap-2"
          >
            <HiOutlineLogout size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[500px] bg-white shadow-md rounded-lg flex-1">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="sticky top-0 bg-[#101c3a] text-white z-10">
            <tr>
              <th className="px-4 py-3">S.No</th>
              <th className="px-4 py-3">Tool Name</th>
              <th className="px-4 py-3">Tool ID</th>
              <th className="px-4 py-3">Issued By</th>
              <th className="px-4 py-3">Issue Time</th>
              <th className="px-4 py-3">Returned?</th>
              <th className="px-4 py-3">Return Time</th>
              <th className="px-4 py-3">Condition</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-[#f6f8fa]' : 'bg-white'}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{row.toolName}</td>
                  <td className="px-4 py-3">{row.toolId}</td>
                  <td className="px-4 py-3">{row.issuedBy}</td>
                  <td className="px-4 py-3">{row.issueTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.returned === 'Yes'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}>
                      {row.returned}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.returnTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.condition === 'Good'
                        ? 'bg-green-100 text-green-700'
                        : row.condition === 'Worn'
                        ? 'bg-yellow-100 text-yellow-800'
                        : row.condition === 'Damaged'
                        ? 'bg-red-100 text-red-700'
                        : 'text-gray-500'
                    }`}>
                      {row.condition}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan={8}>
                  No tools found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TooliQ. All rights reserved.
      </footer>
    </div>
  );
};

export default StoreDashboard;
