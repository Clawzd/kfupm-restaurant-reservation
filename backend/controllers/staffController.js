/**
 * Staff controller
 * 
 * What this file does:
 * - Handles order management for staff and managers
 * - Updates order status (pending → preparing → ready → picked)
 * - Manages order cancellation
 * - Validates status transitions
 * 
 * Frontend components using this:
 * - src/pages/StaffDashboard.tsx - Uses all staff controller functions
 * - src/pages/AdminDashboard.tsx - Uses updateOrderStatus and cancelOrder functions
 * - src/components/staff/ViewOrders.tsx - Uses updateOrderStatus and cancelOrder (via props)
 * - src/components/staff/CanceledOrders.tsx - Uses getCancelledOrders (via props)
 */
import Order from '../models/Order.js';

// @desc    Get orders for staff (filtered by location)
// @route   GET /api/staff/orders
// @access  Private/Staff
export const getStaffOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Only show active orders (pending, preparing, ready)
    let query = { 
      status: { $in: ['pending', 'preparing', 'ready'] }
    };
    
    // Filter by status if provided (but still must be active)
    if (status && ['pending', 'preparing', 'ready'].includes(status)) {
      query.status = status;
    }
    
    const orders = await Order.find(query)
      .populate('userId', 'username email firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PATCH /api/staff/orders/:id/status
// @access  Private/Staff
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'ready', 'picked'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
      });
    }
    
    const order = await Order.findById(req.params.id)
      .populate('userId', 'username email firstName lastName');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    
    // Validate status transitions - strict rules
    const currentStatus = order.status;
    const validTransitions = {
      'pending': ['preparing', 'cancelled'],
      'preparing': ['ready', 'cancelled'],
      'ready': ['picked'],
      'picked': [], // Cannot transition from picked
      'cancelled': [] // Cannot transition from cancelled
    };
    
    if (currentStatus === 'cancelled' || currentStatus === 'picked') {
      return res.status(400).json({ 
        message: 'Cannot update status of cancelled or picked orders' 
      });
    }
    
    if (!validTransitions[currentStatus]?.includes(status)) {
      return res.status(400).json({ 
        message: `Invalid transition: Cannot change status from ${currentStatus} to ${status}` 
      });
    }
    
    order.status = status;
    const updatedOrder = await order.save();
    
    // Return populated order for consistency
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('userId', 'username email firstName lastName');
    
    res.json(populatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message || 'Failed to update order status' });
  }
};

// @desc    Cancel order
// @route   PATCH /api/staff/orders/:id/cancel
// @access  Private/Staff
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'username email firstName lastName');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    
    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }
    
    if (order.status === 'picked') {
      return res.status(400).json({ message: 'Cannot cancel a picked order' });
    }
    
    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.canceledBy = req.user.role; // 'staff' or 'manager'
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get cancelled orders for staff
// @route   GET /api/staff/orders/cancelled
// @access  Private/Staff
export const getCancelledOrders = async (req, res) => {
  try {
    const query = { status: 'cancelled' };
    
    const orders = await Order.find(query)
      .populate('userId', 'username email firstName lastName')
      .sort({ cancelledAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

