const TimeLog = require('../models/TimeLog');
const Employee = require('../models/Employee');

exports.logTime = async (req, res) => {
  try {
    const { nfcCardId, type } = req.body;

    const employee = await Employee.findOne({ nfcCardId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const timeLog = new TimeLog({
      employee: employee._id,
      type,
      timestamp: new Date()
    });

    await timeLog.save();
    res.status(201).json(timeLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEmployeeTimeLogs = async (req, res) => {
  try {
    const timeLogs = await TimeLog.find({ employee: req.params.employeeId })
      .sort({ timestamp: -1 })
      .populate('employee', 'name');
    res.json(timeLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlyOvertime = async (req, res) => {
  try {
    const { employeeId, year, month } = req.params;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const timeLogs = await TimeLog.find({
      employee: employeeId,
      timestamp: { $gte: startDate, $lte: endDate }
    }).sort({ timestamp: 1 });

    let totalWorkTime = 0;
    let lastInTime = null;

    timeLogs.forEach(log => {
      if (log.type === 'in') {
        lastInTime = log.timestamp;
      } else if (log.type === 'out' && lastInTime) {
        totalWorkTime += (log.timestamp - lastInTime) / (1000 * 60 * 60); // Convert to hours
        lastInTime = null;
      }
    });

    const standardWorkHours = 8 * 22; // Assuming 22 working days per month
    const overtime = Math.max(0, totalWorkTime - standardWorkHours);

    res.json({ totalWorkTime, overtime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};