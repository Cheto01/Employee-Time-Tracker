import React, { useState } from 'react';
import axios from 'axios';

const TimeLog = () => {
  const [nfcCardId, setNfcCardId] = useState('');
  const [type, setType] = useState('in');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/time-logs', { nfcCardId, type });
      setMessage(`Time logged successfully for employee ${response.data.employee}`);
      setNfcCardId('');
    } catch (error) {
      setMessage('Error logging time. Please try again.');
      console.error('Error logging time:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-6">
        <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">Log Time</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nfcCardId" className="block text-gray-700 text-sm font-bold mb-2">NFC Card ID</label>
            <input
              type="text"
              id="nfcCardId"
              value={nfcCardId}
              onChange={(e) => setNfcCardId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="in">Clock In</option>
              <option value="out">Clock Out</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Log Time
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default TimeLog;