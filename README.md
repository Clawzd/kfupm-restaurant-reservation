# KFUPM Restaurant Reservation System

A full-stack web application for managing restaurant orders and reservations at KFUPM (King Fahd University of Petroleum and Minerals). Built with React, TypeScript, Express.js, and MongoDB.

## 🎯 Overview

The system provides three user roles with tailored interfaces:

- **Students**: Browse menu, place orders, track order status, view history
- **Staff**: Manage orders, update status, control menu availability
- **Managers**: Full admin dashboard with user management, reports, and archiving

---

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS + shadcn/ui
- React Router + React Query

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone Repository
```bash
git clone https://github.com/vMuhaymin/kfupm-restaurant-reservation.git
cd kfupm-restaurant-reservation
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=55555
HOST=localhost
```

Start backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ..
npm install
npm run dev
```

### 4. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:55555/api

---

## 🔐 Demo Credentials

| Role | Email | Password | Dashboard Path |
|------|-------|----------|----------------|
| Student | `student@system.com` | `student` | `/student/menu` |
| Staff | `staff@system.com` | `staff` | `/staff/orders` |
| Manager | `admin@system.com` | `admin` | `/manager/orders` |

---

## 📁 Project Structure

```
kfupm-restaurant-reservation/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Login, register, password reset
│   │   ├── menuController.js      # Menu CRUD operations
│   │   ├── orderController.js     # Student order management
│   │   ├── staffController.js     # Staff order operations
│   │   └── managerController.js   # Admin operations
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── optionalAuth.js       # Optional auth for public routes
│   │   ├── upload.js             # Image upload config
│   │   └── validateObjectId.js   # MongoDB ID validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── MenuItem.js           # Menu item schema
│   │   ├── Order.js              # Order schema
│   │   ├── ArchivedOrder.js      # Archived orders
│   │   └── ResetCode.js          # Password reset codes
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   ├── menuRoutes.js         # /api/menu/*
│   │   ├── orderRoutes.js        # /api/orders/*
│   │   ├── staffRoutes.js        # /api/staff/*
│   │   └── managerRoutes.js      # /api/manager/*
│   ├── uploads/menu_images/       # Menu item images
│   └── server.js                  # Express entry point
│
├── src/
│   ├── pages/                     # React page components
│   │   ├── Login.tsx, SignUp.tsx, ForgotPassword.tsx
│   │   ├── BrowseMenu.tsx, MyCart.tsx, EditCart.tsx
│   │   ├── CurrentOrders.tsx, OrderHistory.tsx
│   │   ├── StaffDashboard.tsx, AdminDashboard.tsx
│   │   └── Home.tsx, NotFound.tsx
│   ├── components/
│   │   ├── student/              # Student UI components
│   │   ├── staff/                # Staff UI components
│   │   ├── admin/                # Admin UI components
│   │   └── ui/                   # shadcn/ui components
│   ├── lib/
│   │   └── api.ts                # API client functions
│   └── App.tsx                    # Main app with routing
│
├── package.json
└── README.md
```

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new student |
| POST | `/api/auth/login` | User login (returns JWT) |
| POST | `/api/auth/reset` | Request password reset code |
| POST | `/api/auth/verify` | Verify reset code |
| POST | `/api/auth/change-password` | Set new password |

### Menu
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/menu` | Get all menu items | Public |
| POST | `/api/menu` | Create menu item | Manager |
| PATCH | `/api/menu/:id` | Update menu item | Manager |
| PATCH | `/api/menu/:id/toggle` | Toggle availability | Staff/Manager |
| DELETE | `/api/menu/:id` | Delete menu item | Manager |
| POST | `/api/menu/upload` | Upload menu image | Manager |

### Orders (Student)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/current` | Get active orders |
| GET | `/api/orders/history` | Get order history |
| PATCH | `/api/orders/:id` | Update pending order |
| PATCH | `/api/orders/:id/cancel` | Cancel order |

### Staff
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/staff/orders` | Get all active orders |
| GET | `/api/staff/orders/cancelled` | Get cancelled orders |
| PATCH | `/api/staff/orders/:id/status` | Update order status |
| PATCH | `/api/staff/orders/:id/cancel` | Cancel order |

### Manager
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/manager/users` | Get all staff/managers |
| POST | `/api/manager/users` | Create user |
| PATCH | `/api/manager/users/:id` | Update user |
| DELETE | `/api/manager/users/:id` | Delete user |
| GET | `/api/manager/orders` | Get all orders |
| DELETE | `/api/manager/orders/cancelled` | Clear cancelled orders |
| GET | `/api/manager/reports` | Get daily reports |
| POST | `/api/manager/archive/bulk` | Archive old orders |
| GET | `/api/manager/archive` | Get archived orders |

---

## ✨ Features

### Student Features
- User registration and authentication
- Browse menu by categories
- Add items to cart with quantity control
- Place orders with pickup time and special instructions
- Track current orders in real-time
- View order history
- Cancel or edit pending orders
- Password reset via email code

### Staff Features
- View all pending/preparing/ready orders
- Update order status workflow
- Toggle menu item availability
- Cancel orders
- View cancelled orders

### Manager Features
- All staff features plus:
- Full menu management (CRUD)
- User management (staff/manager accounts)
- Daily sales reports and analytics
- Archive completed orders
- Bulk archive orders older than X days

---

## 💻 Development Scripts

### Frontend
```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

### Backend
```bash
cd backend
npm run dev      # Start with hot-reload (port 55555)
npm start        # Production mode
```

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| **Abdul Muhaymin** | Student Dashboard Lead | Menu browsing, cart, orders |
| **Shaheer Ahmar** | Admin Dashboard Lead | Reports, user management |
| **Ali Alsarhayd** | Auth & Staff Lead | Authentication, staff dashboard |

---

## 📄 License

This project was created for the SWE Web Development Foundations course at KFUPM.

---

**Version:** 2.0.0 | **Last Updated:** December 2025 | **Status:** Full-Stack Complete
