import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TimeLog from './components/TimeLog';
import EmployeeList from './components/EmployeeList';
import OvertimeReport from './components/OvertimeReport';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <Link to="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">Employee Time Management</span>
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <Link to="/" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Dashboard</Link>
                  <Link to="/time-log" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Time Log</Link>
                  <Link to="/employees" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Employees</Link>
                  <Link to="/overtime" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Overtime Report</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/time-log" element={<TimeLog />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/overtime" element={<OvertimeReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;