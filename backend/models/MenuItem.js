/**
 * MenuItem model
 * 
 * What this file does:
 * - Defines MenuItem schema for MongoDB
 * - Fields: name, description, price, category, imagePath, isAvailable
 * - Tracks availability status for menu items
 * 
 * Frontend usage:
 * - Used by all menu-related endpoints
 * - Menu items displayed in BrowseMenu, MyCart, EditCart
 * - Menu management in AdminDashboard and MenuManagement component
 */
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imagePath: {
    type: String,
    required: true,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Indexes for common queries
// Compound index for filtering by availability and category
menuItemSchema.index({ isAvailable: 1, category: 1 });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;

