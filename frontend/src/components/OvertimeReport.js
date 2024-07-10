import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OvertimeReport = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [overtimeData, setOvertimeData] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchOvertimeData = async () => {
    if (!selectedEmployee) return;

    try {
      const overtimeByMonth = [];
      for (let month = 1; month <= 12; month++) {
        const response = await axios.get(`http://localhost:5000/api/time-logs/overtime/${selectedEmployee}/${year}/${month}`);
        overtimeByMonth.push({
          month: new Date(year, month - 1).toLocaleString('default', { month: 'short' }),
          overtime: response.data.overtime
        });
      }
      setOvertimeData(overtimeByMonth);
    } catch (error) {
      console.error('Error fetching overtime data:', error);
    }
  };

  useEffect(() => {
    if (selectedEmployee && year) {
      fetchOvertimeData();
    }
  }, [selectedEmployee, year]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Overtime Report</h1>
      
      <div className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label htmlFor="employee" className="block text-gray-700 text-sm font-bold mb-2">Select Employee</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {overtimeData.length > 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-xl font-bold mb-4">Overtime Hours by Month</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={overtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="overtime" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default OvertimeReport;