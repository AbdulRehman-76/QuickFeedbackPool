// File: server/models/Poll.js
const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: { type: String, required: true }, // e.g., "Python"
      votes: { type: Number, default: 0 }     // e.g., 10 (starts at 0)
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', pollSchema);