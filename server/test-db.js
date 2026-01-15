const mongoose = require('mongoose');

// PASTE YOUR EXACT VERCEL STRING HERE (Hardcode it for this test)
const uri = "mongodb+srv://251370249_db_user:BpfW83IMQkpYL8bJ@cluster0.bqhf7vx.mongodb.net/Polls"; 

console.log("⏳ Testing connection...");

mongoose.connect(uri)
  .then(() => {
    console.log("✅ SUCCESS! The string works.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ FAILED!", err.message);
    process.exit(1);
  });