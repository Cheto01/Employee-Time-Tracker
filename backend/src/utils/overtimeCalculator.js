const calculateOvertime = (timeLogs, standardHoursPerDay = 8) => {
    let totalWorkTime = 0;
    let lastInTime = null;
  
    timeLogs.forEach(log => {
      if (log.type === 'in') {
        lastInTime = new Date(log.timestamp);
      } else if (log.type === 'out' && lastInTime) {
        const outTime = new Date(log.timestamp);
        totalWorkTime += (outTime - lastInTime) / (1000 * 60 * 60); // Convert to hours
        lastInTime = null;
      }
    });
  
    const standardWorkHours = standardHoursPerDay * getWorkdaysInMonth(timeLogs[0].timestamp);
    const overtime = Math.max(0, totalWorkTime - standardWorkHours);
  
    return {
      totalWorkTime: totalWorkTime.toFixed(2),
      overtime: overtime.toFixed(2)
    };
  };
  
  const getWorkdaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    let workdays = 0;
  
    for (let i = 1; i <= days; i++) {
      const day = new Date(year, month, i).getDay();
      if (day !== 0 && day !== 6) workdays++; // Count if it's not Saturday or Sunday
    }
  
    return workdays;
  };
  
  module.exports = {
    calculateOvertime
  };