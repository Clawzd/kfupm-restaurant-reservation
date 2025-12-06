/**
 * Menu controller
 * 
 * What this file does:
 * - Handles menu item CRUD operations
 * - Manages menu item availability
 * - Handles image uploads for menu items
 * - Filters menu items by availability (students see only available items)
 * 
 * Frontend components using this:
 * - src/pages/BrowseMenu.tsx - Uses getMenu function
 * - src/pages/MyCart.tsx - Uses getMenu function
 * - src/pages/EditCart.tsx - Uses getMenu function
 * - src/pages/StaffDashboard.tsx - Uses getMenu and toggleAvailability functions
 * - src/pages/AdminDashboard.tsx - Uses all menu functions
 * - src/components/admin/MenuManagement.tsx - Uses all menu functions including uploadMenuItemImage
 * - src/components/staff/MenuAvailability.tsx - Uses toggleAvailability function (via props)
 */
import MenuItem from '../models/MenuItem.js';

// @desc    Get all menu items (students see only available)
// @route   GET /api/menu
// @access  Public
export const getMenu = async (req, res) => {
  try {
    let query = {};
    
    // Students only see available items
    // If no user is authenticated or user is a student, show only available items
    // Staff and managers see all items (available and unavailable)
    if (!req.user || req.user.role === 'student') {
      query.isAvailable = true;
    }
    // For staff and manager, don't filter by isAvailable (show all items)
    
    const menuItems = await MenuItem.find(query).sort({ createdAt: -1 });
    
    res.json(menuItems);
  } catch (error) {
    console.error('[GET MENU] Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private/Manager
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, category, price, imagePath } = req.body;

    if (!name || !description || !category || !price || !imagePath) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      category,
      price,
      imagePath
    });

    res.status(201).json(menuItem);
  } catch (error) {
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Menu item with this name already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update menu item
// @route   PATCH /api/menu/:id
// @access  Private/Manager
export const updateMenuItem = async (req, res) => {
  try {
    const { name, description, category, price, imagePath } = req.body;

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (category) menuItem.category = category;
    if (price !== undefined) menuItem.price = price;
    if (imagePath) menuItem.imagePath = imagePath;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle menu item availability
// @route   PATCH /api/menu/:id/toggle
// @access  Private/Staff
export const toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    const updatedMenuItem = await menuItem.save();

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Manager
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await menuItem.deleteOne();
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ###################### NEW ENDPOINT ADDED ######################
// Image upload endpoint - uses multer middleware
// ###################### NEW ENDPOINT ADDED ######################
// @desc    Upload menu item image
// @route   POST /api/menu/upload
// @access  Private/Manager
export const uploadMenuItemImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Return the image path relative to /uploads
    const imagePath = `/menu_images/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      imagePath: imagePath,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

