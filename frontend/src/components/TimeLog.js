// timeLogController.js
const TimeLog = require('../models/TimeLog');
const Employee = require('../models/Employee');

exports.logTime = async (req, res) => {
  try {
    const { employeeId, nfcCardId, type } = req.body;

    // Verify employee
    const employee = await Employee.findOne({ nfcCardId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Create new time log
    const timeLog = new TimeLog({
      employee: employee._id,
      type, // 'in' or 'out'
      timestamp: new Date()
    });

    await timeLog.save();

    res.status(201).json({ message: 'Time logged successfully', timeLog });
  } catch (error) {
    res.status(500).json({ message: 'Error logging time', error: error.message });
  }
};

// timeLogRoutes.js
const express = require('express');
const router = express.Router();
const timeLogController = require('../controllers/timeLogController');

router.post('/log', timeLogController.logTime);

module.exports = router;