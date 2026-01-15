// File: server/index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Poll = require('./models/Poll'); // Import the schema you just wrote

const app = express();

// Middleware
app.use(cors()); // Allow React (port 5173) to talk to Node (port 5000)
app.use(express.json()); // Allow reading JSON data sent from React

// --- ROUTES ---

// 1. Create a Poll (POST)
app.post('/api/polls', async (req, res) => {
  try {
    await connectDB();
    // req.body looks like: { question: "Best color?", options: ["Red", "Blue"] }
    const { question, options } = req.body;
    
    // Convert ["Red", "Blue"] into [{text: "Red", votes: 0}, ...]
    const formattedOptions = options.map(opt => ({ text: opt, votes: 0 }));

    const newPoll = new Poll({
      question,
      options: formattedOptions
    });

    await newPoll.save();
    res.status(201).json(newPoll); // Send back the new poll (with its unique _id)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get a Poll by ID (GET)
app.get('/api/polls/:id', async (req, res) => {
  try {
    await connectDB();
    const poll = await Poll.findById(req.params.id);
    res.json(poll);
  } catch (err) {
    res.status(404).json({ error: "Poll not found" });
  }
});

// 3. Vote on an Option (POST/PATCH)
app.post('/api/polls/:id/vote', async (req, res) => {
  try {
    await connectDB();
    const { optionIndex } = req.body; // e.g., index 0 for the first option
    const poll = await Poll.findById(req.params.id);
    
    // Increment the vote
    poll.options[optionIndex].votes += 1;
    await poll.save();
    
    res.json(poll); // Return updated poll so the chart updates
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const connectDB = async () => {
  // If already connected, do nothing
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  // Otherwise, connect
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ New MongoDB Connection Established");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
};
// --- CONNECT TO DB & START ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// FOR LOCAL (Keep this so you can still run it locally)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// FOR VERCEL (Export the app)
module.exports = app;