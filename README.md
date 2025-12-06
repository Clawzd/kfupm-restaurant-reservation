# KFUPM Restaurant Reservation System

A modern, full-stack web application for managing restaurant orders and reservations at KFUPM (King Fahd University of Petroleum and Minerals). Built with React, TypeScript, TailwindCSS, Express.js, and MongoDB.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Demo Credentials](#demo-credentials)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Team Members](#team-members)
- [Contributing](#contributing)

---

## 🎯 Project Overview

The KFUPM Restaurant Reservation System is a comprehensive full-stack application designed to streamline the food ordering process for students, staff, and administrators. The system provides three distinct user roles with tailored interfaces and functionalities:

- **Students**: Browse menu, place orders, track order status, view order history
- **Staff**: Manage orders, update order status, control menu availability
- **Managers/Admins**: Full dashboard with analytics, user management, menu management, and order archiving

---

## ✨ Features

### Student Features
- ✅ User authentication (login/signup)
- ✅ Browse restaurant menu with categories (Main Course, Appetizers, Beverages, Desserts)
- ✅ Add items to shopping cart
- ✅ View and manage cart with quantity adjustments
- ✅ Place orders with pickup time and special instructions
- ✅ Payment dialog simulation
- ✅ Track current orders in real-time
- ✅ View order history with status tracking
- ✅ Cancel pending orders
- ✅ Edit pending orders
- ✅ Password reset with 5-digit code

### Staff Features
- ✅ View pending and active orders
- ✅ Update order status (Pending → Preparing → Ready → Picked)
- ✅ Manage menu item availability
- ✅ View and manage canceled orders
- ✅ Real-time order updates (5-second polling)

### Manager/Admin Features
- ✅ Complete order management system
- ✅ Menu management (add, edit, delete items with image upload)
- ✅ User management (create/edit/delete staff and manager accounts)
- ✅ Daily reports and analytics
- ✅ Archive completed orders
- ✅ Bulk archive orders older than X days
- ✅ Clear cancelled orders
- ✅ System-wide dashboard

### General Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Toast notifications for user feedback
- ✅ Session management with localStorage
- ✅ Professional UI with shadcn/ui components
- ✅ RESTful API design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI library |
| TypeScript | 5.8.3 | Type-safe JavaScript |
| Vite | 5.4.19 | Build tool and dev server |
| TailwindCSS | 3.4.17 | Utility-first CSS framework |
| shadcn/ui | - | High-quality React components |
| React Router | 6.30.1 | Client-side routing |
| React Query | 5.83.0 | Server state management |
| Sonner | 1.7.4 | Toast notifications |
| Lucide React | 0.462.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express.js | 4.18.2 | Web framework |
| MongoDB | - | NoSQL database |
| Mongoose | 8.0.3 | MongoDB ODM |
| JWT | 9.0.2 | Authentication tokens |
| bcryptjs | 2.4.3 | Password hashing |
| Multer | 2.0.2 | File upload handling |
| CORS | 2.8.5 | Cross-origin resource sharing |
| dotenv | 16.3.1 | Environment variables |

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **MongoDB** (local or MongoDB Atlas)
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/vMuhaymin/kfupm-restaurant-reservation.git
cd kfupm-restaurant-reservation
```

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
PORT=55555
HOST=localhost
NODE_ENV=development
```

```bash
# Start backend server
npm run dev
```

Backend will be available at `http://localhost:55555`

### Step 3: Setup Frontend

```bash
# Navigate to root directory (from backend)
cd ..

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
kfupm-restaurant-reservation/
├── backend/                        # Express.js Backend
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   │
│   ├── controllers/               # Route handlers
│   │   ├── authController.js      # Authentication logic
│   │   ├── menuController.js      # Menu CRUD operations
│   │   ├── orderController.js     # Student order operations
│   │   ├── staffController.js     # Staff order management
│   │   └── managerController.js   # Admin operations
│   │
│   ├── middleware/                # Express middleware
│   │   ├── auth.js               # JWT auth & role authorization
│   │   ├── optionalAuth.js       # Optional authentication
│   │   ├── upload.js             # Multer file upload config
│   │   └── validateObjectId.js   # MongoDB ID validation
│   │
│   ├── models/                    # Mongoose schemas
│   │   ├── User.js               # User model
│   │   ├── MenuItem.js           # Menu item model
│   │   ├── Order.js              # Order model
│   │   ├── ArchivedOrder.js      # Archived order model
│   │   └── ResetCode.js          # Password reset codes
│   │
│   ├── routes/                    # API route definitions
│   │   ├── authRoutes.js         # /api/auth/*
│   │   ├── menuRoutes.js         # /api/menu/*
│   │   ├── orderRoutes.js        # /api/orders/*
│   │   ├── staffRoutes.js        # /api/staff/*
│   │   └── managerRoutes.js      # /api/manager/*
│   │
│   ├── uploads/                   # Static file storage
│   │   └── menu_images/          # Menu item images
│   │
│   ├── server.js                  # Express app entry point
│   └── package.json               # Backend dependencies
│
├── src/                           # React Frontend
│   ├── pages/                     # Page components
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── CheckEmail.tsx
│   │   ├── SetNewPassword.tsx
│   │   ├── Home.tsx
│   │   ├── BrowseMenu.tsx
│   │   ├── MyCart.tsx
│   │   ├── EditCart.tsx
│   │   ├── CurrentOrders.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── StaffDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── student/
│   │   │   ├── StudentNavbar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MenuCard.tsx
│   │   │   ├── MenuSection.tsx
│   │   │   ├── PaymentDialog.tsx
│   │   │   └── OrderConfirmationDialog.tsx
│   │   ├── staff/
│   │   │   ├── ViewOrders.tsx
│   │   │   ├── CanceledOrders.tsx
│   │   │   └── MenuAvailability.tsx
│   │   ├── admin/
│   │   │   ├── MenuManagement.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   ├── DailyReports.tsx
│   │   │   └── ArchiveOrders.tsx
│   │   ├── common/
│   │   │   ├── LandingNavbar.tsx
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/                    # shadcn/ui components (40+)
│   │
│   ├── lib/
│   │   ├── api.ts                # API client functions
│   │   └── utils.ts              # Helper functions
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript definitions
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx        # Mobile detection
│   │
│   ├── assets/                    # Static images
│   ├── App.tsx                    # Main app with routing
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:55555/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new student | Public |
| POST | `/login` | User login | Public |
| POST | `/reset` | Request password reset code | Public |
| POST | `/verify` | Verify reset code | Public |
| POST | `/change-password` | Change password with code | Public |

#### Menu (`/api/menu`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all menu items | Public (filtered by role) |
| GET | `/:id` | Get single menu item | Public |
| POST | `/` | Create menu item | Manager |
| PATCH | `/:id` | Update menu item | Manager |
| PATCH | `/:id/toggle` | Toggle availability | Staff/Manager |
| DELETE | `/:id` | Delete menu item | Manager |
| POST | `/upload` | Upload menu image | Manager |

#### Orders - Student (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create new order | Student |
| GET | `/current` | Get active orders | Student |
| GET | `/history` | Get order history | Student |
| GET | `/:id` | Get order details | Authenticated |
| PATCH | `/:id` | Update pending order | Student |
| PATCH | `/:id/cancel` | Cancel pending order | Student |

#### Staff (`/api/staff`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/orders` | Get all active orders | Staff/Manager |
| GET | `/orders/cancelled` | Get cancelled orders | Staff/Manager |
| PATCH | `/orders/:id/status` | Update order status | Staff/Manager |
| PATCH | `/orders/:id/cancel` | Cancel order | Staff/Manager |

#### Manager (`/api/manager`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/users` | Get all staff/managers | Manager |
| POST | `/users` | Create staff/manager | Manager |
| PATCH | `/users/:id` | Update user | Manager |
| DELETE | `/users/:id` | Delete user | Manager |
| GET | `/orders` | Get all orders | Manager |
| GET | `/orders/cancelled` | Get cancelled orders | Manager |
| DELETE | `/orders/cancelled` | Clear cancelled orders | Manager |
| GET | `/reports` | Get daily reports | Manager |
| POST | `/archive/:orderId` | Archive single order | Manager |
| POST | `/archive/bulk` | Bulk archive orders | Manager |
| GET | `/archive` | Get archived orders | Manager |

---

## 🗄️ Database Schema

### User
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: 'student' | 'staff' | 'manager',
  firstName: String,
  lastName: String,
  createdAt: Date
}
```

### MenuItem
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  imagePath: String,
  isAvailable: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  orderId: String (unique, e.g., "ORD-001"),
  userId: ObjectId (ref: User),
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  specialInstructions: String,
  pickupTime: String,
  status: 'pending' | 'preparing' | 'ready' | 'picked' | 'cancelled',
  cancelledAt: Date,
  canceledBy: 'student' | 'staff' | 'manager',
  createdAt: Date,
  updatedAt: Date
}
```

### ArchivedOrder
```javascript
{
  orderId: String,
  userId: ObjectId (ref: User),
  items: [{ name, quantity, price }],
  specialInstructions: String,
  pickupTime: String,
  status: String,
  createdAt: Date,
  cancelledAt: Date,
  archivedAt: Date
}
```

### ResetCode
```javascript
{
  email: String,
  code: String (5-digit),
  expiresAt: Date (10 min TTL)
}
```

---

## 📖 Usage Guide

### For Students

1. **Register/Login**
   - Navigate to `/auth/signup` to create a new account
   - Or login at `/auth/login` with existing credentials

2. **Browse Menu**
   - View items organized by category
   - Add items to cart using the "+" button
   - Sold-out items are marked with a "SOLD OUT" badge

3. **Place Order**
   - Go to cart, adjust quantities
   - Add special instructions (optional)
   - Select pickup time
   - Complete payment

4. **Track Orders**
   - View current orders at `/student/current-orders`
   - Check order history at `/student/order-history`
   - Cancel or edit pending orders

### For Staff

1. **Login** at `/auth/login`
2. **View Orders** - See all pending/preparing/ready orders
3. **Update Status** - Progress orders through the workflow
4. **Manage Menu** - Toggle item availability
5. **View Cancelled** - Access cancelled orders

### For Managers

1. **Login** at `/auth/login`
2. **All Staff Features** plus:
   - Menu Management (full CRUD)
   - User Management (staff/manager accounts)
   - Daily Reports & Analytics
   - Order Archiving

---

## 🔐 Demo Credentials

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| Student | `student@system.com` | `student` | `/student/menu` |
| Staff | `staff@system.com` | `staff` | `/staff/orders` |
| Manager | `admin@system.com` | `admin` | `/manager/orders` |

---

## 💻 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Backend
```bash
cd backend
npm run dev          # Start with hot-reload (port 55555)
npm start            # Start production server
```

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=55555
HOST=localhost
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:55555/api
```

---

## 🏗️ Build & Deployment

### Production Build

```bash
# Frontend
npm run build
# Output in dist/

# Backend
cd backend
npm start
```

### Deployment Options
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Railway, Render, Heroku, AWS EC2
- **Database**: MongoDB Atlas

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| **Abdul Muhaymin** | Student Dashboard Lead | Student dashboard, menu browsing, cart, orders |
| **Shaheer Ahmar** | Admin Dashboard Lead | Admin dashboard, reports, user management |
| **Ali Alsarhayd** | Auth & Staff Dashboard Lead | Authentication, staff dashboard, backend integration |

---

## 🤝 Contributing

### Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes following code conventions
3. Test thoroughly
4. Commit: `git commit -m "feat: description"`
5. Push: `git push origin feature/your-feature`
6. Create Pull Request

### Commit Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `chore:` - Build/dependencies

---

**Last Updated:** December 6, 2025  
**Version:** 2.0.0  
**Status:** Full-Stack Complete
