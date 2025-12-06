/**
 * Menu routes
 * 
 * What this file does:
 * - Defines menu item management API endpoints
 * - Handles CRUD operations for menu items
 * - Manages menu item availability toggling
 * - Handles image uploads for menu items
 * 
 * API Endpoints:
 * - GET /api/menu - Get all menu items (students see only available, staff/manager see all)
 * - GET /api/menu/:id - Get single menu item
 * - POST /api/menu - Create menu item (Manager only)
 * - PATCH /api/menu/:id - Update menu item (Manager only)
 * - PATCH /api/menu/:id/toggle - Toggle item availability (Staff/Manager)
 * - DELETE /api/menu/:id - Delete menu item (Manager only)
 * - POST /api/menu/upload - Upload menu item image (Manager only)
 * 
 * Frontend components using these endpoints:
 * - src/pages/BrowseMenu.tsx - Uses getMenu endpoint
 * - src/pages/MyCart.tsx - Uses getMenu endpoint
 * - src/pages/EditCart.tsx - Uses getMenu endpoint
 * - src/pages/StaffDashboard.tsx - Uses getMenu and toggleAvailability endpoints
 * - src/pages/AdminDashboard.tsx - Uses getMenu, createMenuItem, updateMenuItem, deleteMenuItem endpoints
 * - src/components/admin/MenuManagement.tsx - Uses all menu endpoints including upload
 * - src/components/staff/MenuAvailability.tsx - Uses toggleAvailability endpoint
 */
import express from 'express';
import {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  toggleAvailability,
  deleteMenuItem,
  uploadMenuItemImage
} from '../controllers/menuController.js';
import { protect, authorize } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', optionalAuth, getMenu);
router.post('/upload', protect, authorize('manager'), upload.single('image'), uploadMenuItemImage);
router.get('/:id', validateObjectId, getMenuItem);
router.post('/', protect, authorize('manager'), createMenuItem);
router.patch('/:id', protect, authorize('manager'), validateObjectId, updateMenuItem);
router.patch('/:id/toggle', protect, authorize('staff', 'manager'), validateObjectId, toggleAvailability);
router.delete('/:id', protect, authorize('manager'), validateObjectId, deleteMenuItem);

export default router;

