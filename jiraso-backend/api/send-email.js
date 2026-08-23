const nodemailer = require('nodemailer');

// Set up CORS headers helper function
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Change '*' to your actual frontend domain when you deploy for security (e.g., 'https://www.yourdomain.com')
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Expecting these fields from your frontend form
  const { name, email, phone, details, items } = req.body;

  // Configure Nodemailer transporter with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,      // Your Gmail address (setup in Vercel env variables)
      pass: process.env.GMAIL_APP_PASS   // Your 16-character App Password (setup in Vercel env variables)
    }
  });

  // Compose the email
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send the email to yourself to receive orders/enquiries
    subject: `New Order/Enquiry from ${name}`,
    html: `
      <h2>New Submission via Website Form</h2>
      <p><strong>Name:</strong> ${name || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Details:</strong> ${details || 'N/A'}</p>
      <hr>
      <h3>Order Details/Items:</h3>
      <p>${items ? JSON.stringify(items) : 'No items specified'}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
};

// Export the handler wrapped with CORS
module.exports = allowCors(handler);
