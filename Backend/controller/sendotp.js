const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mightguy7.2000@gmail.com',
    pass: 'henm rvqg mynj iqjx',
  }
});

const otpStorage = new Map();

// Corrected the routes with a leading slash
const sendotp =  async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(Math.random() * 9999);

  otpStorage.set(email, otp);

  const mailOptions = {
    from: 'mightguy7.2000@gmail.com',
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`, // Use backticks here
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Corrected the route for OTP verification
const verifyotp = async (req, res) => {
    const { email, userEnteredOtp } = req.body;
    const storedOtp = otpStorage.get(email);
  
    if (storedOtp && storedOtp.toString() === userEnteredOtp) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  };
  

module.exports = {sendotp, verifyotp};