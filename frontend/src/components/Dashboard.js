import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [averageHours, setAverageHours] = useState(0);
  const [overtimeData, setOvertimeData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:5000/api/employees');
        setEmployeeCount(employeesResponse.data.length);

        // This is a placeholder. need to implement an endpoint to calculate average hours
        setAverageHours(7.5);

        // This is a placeholder. need to implement an endpoint to get overtime data
        const mockOvertimeData = [
          { month: 'Jan', overtime: 20 },
          { month: 'Feb', overtime: 15 },
          { month: 'Mar', overtime: 25 },
          { month: 'Apr', overtime: 18 },
          { month: 'May', overtime: 22 },
          { month: 'Jun', overtime: 30 },
        ];
        setOvertimeData(mockOvertimeData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{employeeCount}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Average Hours / Day</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{averageHours}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Overtime</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {overtimeData.reduce((sum, month) => sum + month.overtime, 0)} hours
            </dd>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overtime Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
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
    </div>
  );
};

export default Dashboard;