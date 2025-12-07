/**
 * Authentication controller
 * 
 * What this file does:
 * - Handles user authentication (login, registration)
 * - Manages password reset flow with 5-digit codes
 * - Generates JWT tokens for authenticated users
 * 
 * Frontend components using this:
 * - src/pages/Login.tsx - Uses login function
 * - src/pages/SignUp.tsx - Uses register function
 * - src/pages/ForgotPassword.tsx - Uses requestReset function
 * - src/pages/CheckEmail.tsx - Uses verifyCode and requestReset functions
 * - src/pages/SetNewPassword.tsx - Uses changePassword function
 */
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ResetCode from '../models/ResetCode.js';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create username from email (before @)
    const username = email.split('@')[0];

    // Create user (students only)
    const user = await User.create({
      username,
      email,
      password,
      role: 'student',
      firstName,
      lastName
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id),
        message: 'Account created successfully'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      return res.status(400).json({ 
        message: `${field === 'email' ? 'Email' : field === 'username' ? 'Username' : 'Field'} already in use` 
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request password reset code
// @route   POST /api/auth/reset
// @access  Public
export const requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide email' });
    }

    const user = await User.findOne({ email });
    
    // For security, always return success even if user doesn't exist
    if (!user) {
      return res.json({ success: true, message: 'If the email exists, a reset code has been generated' });
    }

    // Generate 5-digit code
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    // Delete any existing codes for this email
    await ResetCode.deleteMany({ email });

    // Create new reset code
    await ResetCode.create({
      email,
      code
    });

    // Return code to frontend (frontend will display as alert)
    res.json({ success: true, code, message: 'Reset code generated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify reset code
// @route   POST /api/auth/verify
// @access  Public
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Please provide email and code' });
    }

    const resetCode = await ResetCode.findOne({ email, code });

    if (!resetCode) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    if (resetCode.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Code has expired' });
    }

    res.json({ message: 'Code verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Public
export const changePassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Please provide email, code, and new password' });
    }

    // Verify code
    const resetCode = await ResetCode.findOne({ email, code });
    if (!resetCode || resetCode.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password - set it directly, the pre-save hook will hash it automatically
    user.password = newPassword;
    await user.save();

    // Delete reset code
    await ResetCode.deleteMany({ email });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

