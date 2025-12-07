/**
 * User model
 * 
 * What this file does:
 * - Defines User schema for MongoDB
 * - Fields: username, email, password, role, firstName, lastName
 * - Automatically hashes passwords before saving
 * - Provides password comparison method for authentication
 * 
 * Frontend usage:
 * - Used by all authentication endpoints
 * - User data returned in login/register responses
 * - User information displayed in admin dashboard
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'staff', 'manager'],
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Indexes
// Email is already unique (defined in schema)
// Add index on role for querying staff/managers
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

export default User;

