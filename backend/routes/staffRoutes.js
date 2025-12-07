/**
 * Staff routes
 * 
 * What this file does:
 * - Defines order management API endpoints for staff and managers
 * - Handles order status updates and cancellation
 * 
 * API Endpoints:
 * - GET /api/staff/orders - Get all active orders (pending, preparing, ready) (Staff/Manager)
 * - GET /api/staff/orders/cancelled - Get all cancelled orders (Staff/Manager)
 * - PATCH /api/staff/orders/:id/status - Update order status (Staff/Manager)
 * - PATCH /api/staff/orders/:id/cancel - Cancel order (Staff/Manager)
 * 
 * Frontend components using these endpoints:
 * - src/pages/StaffDashboard.tsx - Uses all staff endpoints
 * - src/pages/AdminDashboard.tsx - Uses updateOrderStatus and cancelOrder endpoints
 * - src/components/staff/ViewOrders.tsx - Uses updateOrderStatus and cancelOrder endpoints (via props)
 * - src/components/staff/CanceledOrders.tsx - Uses getCancelledOrders endpoint (via props)
 */
import express from 'express';
import {
  getStaffOrders,
  updateOrderStatus,
  cancelOrder,
  getCancelledOrders
} from '../controllers/staffController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

router.use(protect);
router.use(authorize('staff', 'manager'));

router.get('/orders', getStaffOrders);
router.get('/orders/cancelled', getCancelledOrders);
router.patch('/orders/:id/status', validateObjectId, updateOrderStatus);
router.patch('/orders/:id/cancel', validateObjectId, cancelOrder);

export default router;

