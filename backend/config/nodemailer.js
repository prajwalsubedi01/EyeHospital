const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN
  }
});

// Professional email sending function
const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Eye Hospital Appointments" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      replyTo: 'contact@eyehospital.com',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };