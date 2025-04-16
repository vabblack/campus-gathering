const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const crypto = require('crypto');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Registration attempt for:', email);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const plainOTP = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    console.log('Generated OTP:', plainOTP, 'for user:', email);

    // Create new user with plain OTP
    user = new User({
      email,
      password,
      name,
      otp: plainOTP, // This will be hashed by the pre-save middleware
      otpExpiry
    });

    // Save user - password and OTP will be hashed by the pre-save middleware
    await user.save();
    console.log('User saved successfully:', user._id);

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - Campus Events',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; text-align: center;">Welcome to Campus Events!</h2>
          <p>Thank you for registering. Your OTP for email verification is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <h1 style="color: #f59e0b; font-size: 32px; letter-spacing: 5px;">${plainOTP}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">
            This OTP will expire in 10 minutes.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP email sent to:', email);

    res.status(201).json({ 
      message: 'Registration successful. Please check your email for OTP.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    console.log('OTP verification attempt for user:', userId);
    console.log('Received OTP:', otp);

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('Found user:', user.email);
    console.log('Stored OTP:', user.otp);
    console.log('Stored OTP expiry:', user.otpExpiry);
    console.log('Current time:', new Date());
    console.log('OTP match:', user.otp === otp);
    console.log('OTP expired:', Date.now() > user.otpExpiry);

    // Check if OTP is expired
    if (Date.now() > user.otpExpiry) {
      console.log('OTP expired');
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Compare OTPs directly
    const isValid = user.otp === otp;
    console.log('OTP validation result:', isValid);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark user as verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    console.log('User verified successfully:', user.email);

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new OTP
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send new OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'New OTP - Campus Events',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; text-align: center;">New OTP</h2>
          <p>Your new OTP for email verification is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <h1 style="color: #f59e0b; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">
            This OTP will expire in 10 minutes.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'New OTP sent successfully' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Failed to resend OTP' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ 
        message: 'Please verify your email before logging in',
        needsVerification: true,
        userId: user._id
      });
    }

    // Create and return JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get all users (admin route)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router; 