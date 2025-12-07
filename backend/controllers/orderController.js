/**
 * Order controller (Student order management)
 * 
 * What this file does:
 * - Handles order creation, viewing, updating, and cancellation for students
 * - Generates unique order IDs (ORD001, ORD002, etc.)
 * - Validates menu item availability before order creation/update
 * 
 * Frontend components using this:
 * - src/pages/MyCart.tsx - Uses createOrder and updateOrder functions
 * - src/pages/CurrentOrders.tsx - Uses getCurrentOrders and cancelOrder functions
 * - src/pages/OrderHistory.tsx - Uses getOrderHistory function
 * - src/pages/EditCart.tsx - Uses getOrder and updateOrder functions
 */
import Order from '../models/Order.js';
import ArchivedOrder from '../models/ArchivedOrder.js';

// Generate order ID (ORD001, ORD002, ...)
const generateOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  if (!lastOrder) {
    return 'ORD001';
  }
  
  const lastNumber = parseInt(lastOrder.orderId.replace('ORD', ''));
  const newNumber = lastNumber + 1;
  return `ORD${newNumber.toString().padStart(3, '0')}`;
};

import MenuItem from '../models/MenuItem.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Student
export const createOrder = async (req, res) => {
  try {
    const { items, pickupTime, specialInstructions } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one item' });
    }

    if (!pickupTime) {
      return res.status(400).json({ message: 'Please provide pickup time' });
    }

    // Validate all items exist and are available
    for (const item of items) {
      if (!item.name || !item.quantity || !item.price) {
        return res.status(400).json({ message: 'Each item must have name, quantity, and price' });
      }

      // Find menu item by name to check availability
      const menuItem = await MenuItem.findOne({ name: item.name });
      
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item "${item.name}" not found` });
      }

      if (!menuItem.isAvailable) {
        return res.status(400).json({ message: `Menu item "${item.name}" is not available` });
      }
    }

    const orderId = await generateOrderId();

    const order = await Order.create({
      orderId,
      userId: req.user._id,
      items,
      pickupTime,
      specialInstructions: specialInstructions || '',
      status: 'pending'
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'username email firstName lastName');

    res.status(201).json(populatedOrder);
  } catch (error) {
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Handle duplicate orderId errors
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Order ID conflict. Please try again' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current orders (pending, preparing, ready)
// @route   GET /api/orders/current
// @access  Private/Student
export const getCurrentOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
      status: { $in: ['pending', 'preparing', 'ready'] }
    }).sort({ createdAt: -1 })
      .populate('userId', 'username email firstName lastName');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order history
// @route   GET /api/orders/history
// @access  Private/Student
export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
      status: { $in: ['picked', 'cancelled'] }
    }).sort({ createdAt: -1 })
      .populate('userId', 'username email firstName lastName');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'username email firstName lastName');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Students can only see their own orders
    if (req.user.role === 'student' && order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order (students can only update pending orders)
// @route   PATCH /api/orders/:id
// @access  Private/Student
export const updateOrder = async (req, res) => {
  try {
    const { items, pickupTime, specialInstructions } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Students can only update their own orders
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Students can only update pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot modify after preparing' });
    }

    // Validate items if provided
    if (items) {
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Please provide at least one item' });
      }

      // Validate all items exist and are available
      for (const item of items) {
        if (!item.name || !item.quantity || !item.price) {
          return res.status(400).json({ message: 'Each item must have name, quantity, and price' });
        }

        const menuItem = await MenuItem.findOne({ name: item.name });
        
        if (!menuItem) {
          return res.status(400).json({ message: `Menu item "${item.name}" not found` });
        }

        if (!menuItem.isAvailable) {
          return res.status(400).json({ message: `Menu item "${item.name}" is not available` });
        }
      }

      order.items = items;
    }

    if (pickupTime) {
      order.pickupTime = pickupTime;
    }

    if (specialInstructions !== undefined) {
      order.specialInstructions = specialInstructions || '';
    }

    const updatedOrder = await order.save();
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('userId', 'username email firstName lastName');

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order (students can only cancel pending orders)
// @route   PATCH /api/orders/:id/cancel
// @access  Private/Student
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Students can only cancel their own orders
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Students can only cancel pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel order after preparing' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.canceledBy = 'student';

    const updatedOrder = await order.save();
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('userId', 'username email firstName lastName');

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

