const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  type: {
    type: String,
    enum: ['in', 'out'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const TimeLog = mongoose.model('TimeLog', timeLogSchema);

module.exports = TimeLog;