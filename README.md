# KFUPM Restaurant Reservation System

A modern, fully responsive web application for managing restaurant orders and reservations at KFUPM (King Fahd University of Petroleum and Minerals). Built with React, TypeScript, and TailwindCSS.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Demo Credentials](#demo-credentials)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Team Members](#team-members)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

The KFUPM Restaurant Reservation System is a comprehensive frontend application designed to streamline the food ordering process for students, staff, and administrators. The system provides three distinct user roles with tailored interfaces and functionalities:

- **Students**: Browse menu, place orders, track order status, view order history
- **Staff**: Manage orders, update order status, control menu availability
- **Managers/Admins**: Full dashboard with analytics, user management, menu management, and order archiving

This is a **frontend-only prototype** (Milestone 4) built for the SWE Web Development Foundations course. The backend will be developed using Express.js with MongoDB.

---

## ✨ Features

### Student Features
- ✅ User authentication (login/signup)
- ✅ Browse restaurant menu with categories (Main Course, Appetizers, Beverages)
- ✅ Add items to shopping cart
- ✅ View and manage cart with quantity adjustments
- ✅ Place orders with pickup time and special instructions
- ✅ Payment dialog (frontend only)
- ✅ Track current orders in real-time
- ✅ View order history with status tracking
- ✅ Responsive mobile-friendly interface

### Staff Features
- ✅ View pending and active orders
- ✅ Update order status (Pending → Preparing → Ready → Completed)
- ✅ Manage menu item availability
- ✅ View canceled orders
- ✅ Dashboard with order overview

### Manager/Admin Features
- ✅ Complete order management system
- ✅ Menu management (add, edit, delete items)
- ✅ User management (staff and manager accounts)
- ✅ Daily reports and analytics
- ✅ Archive completed orders
- ✅ System-wide dashboard

### General Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Accessibility-first approach
- ✅ Toast notifications for user feedback
- ✅ Password recovery flow
- ✅ Session management with localStorage
- ✅ Professional UI with shadcn/ui components

---

## 🛠️ Tech Stack

### Frontend Framework
- **React** 18.3.1 - UI library
- **TypeScript** 5.8.3 - Type-safe JavaScript
- **Vite** 5.4.19 - Fast build tool and dev server

### Styling & UI
- **TailwindCSS** 3.4.17 - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** 0.462.0 - Beautiful icon library
- **PostCSS** 8.5.6 - CSS processing

### Routing & State Management
- **React Router** 6.30.1 - Client-side routing
- **React Query** 5.83.0 - Server state management (prepared for API integration)
- **React Hook Form** 7.61.1 - Efficient form handling
- **Zod** 3.25.76 - TypeScript-first schema validation

### Notifications & UI Feedback
- **Sonner** 1.7.4 - Toast notifications
- **Radix UI** - Accessible component primitives

### Development Tools
- **ESLint** 9.32.0 - Code linting
- **TypeScript ESLint** 8.38.0 - TypeScript linting
- **Autoprefixer** 10.4.21 - CSS vendor prefixes

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm)
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/vMuhaymin/kfupm-restaurant-reservation
cd kfupm-restaurant-system
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 4: Build for Production
```bash
npm run build
```

### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
kfupm-restaurant-system/
├── src/
│   ├── pages/                      # Page components (full-page views)
│   │   ├── Login.tsx              # Student/Staff/Admin login
│   │   ├── SignUp.tsx             # User registration
│   │   ├── ForgotPassword.tsx      # Password recovery
│   │   ├── CheckEmail.tsx          # Email verification
│   │   ├── SetNewPassword.tsx      # Password reset
│   │   ├── Home.tsx               # Student home page
│   │   ├── BrowseMenu.tsx         # Menu browsing
│   │   ├── MyCart.tsx             # Shopping cart
│   │   ├── CurrentOrders.tsx      # Active orders
│   │   ├── OrderHistory.tsx       # Past orders
│   │   ├── StaffDashboard.tsx     # Staff management
│   │   ├── AdminDashboard.tsx     # Admin management
│   │   └── NotFound.tsx           # 404 page
│   │
│   ├── components/                 # Reusable components
│   │   ├── student/               # Student-specific components
│   │   │   ├── StudentNavbar.tsx
│   │   │   ├── MenuCard.tsx
│   │   │   ├── MenuSection.tsx
│   │   │   ├── PaymentDialog.tsx
│   │   │   └── OrderConfirmationDialog.tsx
│   │   ├── staff/                 # Staff-specific components
│   │   │   ├── ViewOrders.tsx
│   │   │   ├── CanceledOrders.tsx
│   │   │   └── MenuAvailability.tsx
│   │   ├── admin/                 # Admin-specific components
│   │   │   ├── MenuManagement.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   ├── DailyReports.tsx
│   │   │   └── ArchiveOrders.tsx
│   │   ├── common/                # Shared components
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── dialog.tsx
│   │       └── ... (40+ UI components)
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts               # Centralized types
│   │
│   ├── hooks/                      # Custom React hooks
│   │   └── use-mobile.tsx         # Mobile detection hook
│   │
│   ├── lib/                        # Utility functions
│   │   └── utils.ts               # Helper functions
│   │
│   ├── assets/                     # Static images and media
│   │   ├── chef-hero.jpg
│   │   ├── loginres.png
│   │   ├── roasted-corn.jpg
│   │   ├── asparagus-salad.jpg
│   │   ├── shrimp-skewers.jpg
│   │   ├── vegetable-mixups.jpg
│   │   └── wrap-sandwich.jpg
│   │
│   ├── App.tsx                     # Main app component with routing
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles and design system
│
├── public/                         # Static files
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tailwind.config.ts              # TailwindCSS configuration
├── postcss.config.js               # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.js                # ESLint configuration
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── .gitignore                      # Git ignore rules
├── README.md                       # This file
└── ASSESSMENT.md                   # Professional code assessment
```

---

## 📖 Usage Guide

### For Students

#### 1. Login
- Navigate to the login page
- Use demo credentials:
  - **Email:** `student@system.com`
  - **Password:** `student`
- Click "Log In" to access the student dashboard

#### 2. Browse Menu
- Click "Browse Menu" in the navigation
- View items organized by category:
  - Main Course
  - Appetizers
  - Beverages
- Click the "+" button to add items to cart
- Sold-out items are marked with a "SOLD OUT" badge

#### 3. Manage Cart
- Click the shopping cart icon in the navbar
- Adjust quantities using +/- buttons
- Add special instructions (optional)
- Select pickup time
- Click "Place Order" to proceed to payment

#### 4. Track Orders
- **Current Orders:** View active orders being prepared
- **Order History:** View past completed/cancelled orders
- Each order shows:
  - Order ID
  - Status (Confirmed, Being prepared, Completed, Cancelled)
  - Items and quantities
  - Total price
  - Pickup time

### For Staff

#### 1. Login
- **Email:** `staff@system.com`
- **Password:** `staff`

#### 2. Manage Orders
- View pending orders in "View Orders" tab
- Update order status:
  - Pending → Preparing → Ready → Completed
- View canceled orders in "Canceled Orders" tab
- Manage menu availability in "Menu Availability" tab

### For Managers/Admins

#### 1. Login
- **Email:** `admin@system.com`
- **Password:** `admin`

#### 2. Access Dashboard Sections
- **Orders:** View and manage all orders
- **Menu Management:** Add, edit, delete menu items
- **User Management:** Manage staff and manager accounts
- **Daily Reports:** View analytics and reports
- **Archive Orders:** Access historical order data

---

## 🔐 Demo Credentials

The application includes pre-configured demo accounts for testing:

| Role | Email | Password | Path |
|------|-------|----------|------|
| Student | `student@system.com` | `student` | `/student/home` |
| Staff | `staff@system.com` | `staff` | `/staff/orders` |
| Manager | `admin@system.com` | `admin` | `/manager/orders` |

**Note:** These are frontend-only credentials for demonstration. In production, authentication will be handled by the Express.js backend with MongoDB.

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Code Style & Conventions

- **Component naming:** PascalCase (e.g., `StudentNavbar.tsx`)
- **File naming:** PascalCase for components, camelCase for utilities
- **Imports:** Use absolute imports with `@` alias
- **TypeScript:** Strict mode enabled, all components typed
- **Styling:** TailwindCSS utility classes, no inline styles
- **Comments:** JSDoc for components, inline for complex logic

### ESLint Configuration

The project uses ESLint with TypeScript support. Run linting:

```bash
npm run lint
```

Key rules:
- React hooks rules enforced
- Unused variables warnings
- React refresh compatibility

---

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deployment Options

The application can be deployed to:
- **Netlify** - Recommended for static sites
- **Vercel** - Optimized for React apps
- **GitHub Pages** - Free hosting
- **AWS S3 + CloudFront** - Scalable solution
- **Traditional web servers** - Apache, Nginx

### Environment Variables

Create a `.env` file in the root directory (not committed to Git):

```env
# Example environment variables
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=KFUPM Restaurant
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| **Abdul Muhaymin** | Student Dashboard Lead | Student dashboard and all related components | 
| **Shaheer Ahmar** | Admin Dashboard Lead | Complete admin dashboard implementation | 
| **Ali Alsarhayd** | Auth & Staff Dashboard Lead | Authentication pages, staff dashboard, and staff-related components | 

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Follow the code style conventions
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run dev
   # Test in browser
   ```

4. **Commit with meaningful messages**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for code review

### Commit Message Convention

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Build process, dependencies

Example:
```bash
git commit -m "feat: add order tracking functionality"
git commit -m "fix: resolve cart calculation bug"
git commit -m "docs: update README with setup instructions"
```


**Last Updated:** November 22, 2025  
**Version:** 1.0.0  
**Status:** Frontend Complete (Milestone 4)
