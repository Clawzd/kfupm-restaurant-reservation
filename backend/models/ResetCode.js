/**
 * ResetCode model
 * 
 * What this file does:
 * - Defines ResetCode schema for password reset functionality
 * - Stores 5-digit reset codes with 10-minute expiration
 * - Automatically expires codes after expiration time
 * 
 * Frontend usage:
 * - Used by password reset flow
 * - Frontend components: ForgotPassword, CheckEmail, SetNewPassword
 */
import mongoose from 'mongoose';

const resetCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000)
  }
}, {
  timestamps: true
});

resetCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ResetCode = mongoose.model('ResetCode', resetCodeSchema);

export default ResetCode;

