import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [averageHours, setAverageHours] = useState(0);
  const [overtimeData, setOvertimeData] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    // This is a placeholder, replace with actual API calls
    setEmployeeCount(50);
    setAverageHours(7.5);
    setOvertimeData([
      { name: 'Jan', overtime: 20 },
      { name: 'Feb', overtime: 15 },
      { name: 'Mar', overtime: 25 },
      { name: 'Apr', overtime: 18 },
      { name: 'May', overtime: 22 },
      { name: 'Jun', overtime: 30 },
    ]);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Users className="mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-700">Total Employees</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{employeeCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <Clock className="mr-2 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-700">Average Hours/Day</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{averageHours}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <TrendingUp className="mr-2 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-700">Total Overtime</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {overtimeData.reduce((sum, month) => sum + month.overtime, 0)} hours
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Overtime Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overtimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="overtime" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;