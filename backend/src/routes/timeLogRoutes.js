const express = require('express');
const router = express.Router();
const timeLogController = require('../controllers/timeLogController');

router.post('/', timeLogController.logTime);
router.get('/employee/:employeeId', timeLogController.getEmployeeTimeLogs);
router.get('/overtime/:employeeId/:year/:month', timeLogController.getMonthlyOvertime);

module.exports = router;