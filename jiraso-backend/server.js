require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sendEmailHandler = require('./api/send-email');

const app = express();

// Middleware
app.use(cors()); // Allow all origins for local testing
app.use(express.json()); // Parse JSON request bodies

// Mock the Vercel request/response behavior for local testing
app.post('/api/send-email', (req, res) => {
  // Express req and res objects work seamlessly with our Vercel handler function
  return sendEmailHandler(req, res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local testing server running on http://localhost:${PORT}`);
  console.log(`You can send a POST request to http://localhost:${PORT}/api/send-email to test your Nodemailer script locally.`);
});
