# KFUPM Restaurant Reservation System

A full-stack web application for managing restaurant orders and reservations at KFUPM. Built with React, TypeScript, Express.js, and MongoDB.

## 🎯 Overview

The system provides three user roles:
- **Students**: Browse menu, place orders, track status, view history
- **Staff**: Manage orders, update status, control menu availability
- **Managers**: Full admin dashboard with user management, reports, and archiving

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 + TypeScript | Node.js + Express.js |
| Vite | MongoDB + Mongoose |
| TailwindCSS + shadcn/ui | JWT Authentication |
| React Router | Multer (file uploads) |

---

## 🚀 Backend Setup

### Prerequisites
- Node.js 18+
- MongoDB (local installation or MongoDB Atlas account)

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kfupm-restaurant

# JWT Secret Key (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=55555
HOST=localhost
NODE_ENV=development
```

### Step 4: Start the Server
```bash
# Development mode (with hot-reload)
npm run dev

# Production mode
npm start
```

The backend will be running at `http://localhost:55555`

### Step 5: Verify Server is Running
```bash
curl http://localhost:55555/api/health
```
Expected response:
```json
{ "message": "Server is running", "status": "OK" }
```

---

## 🖥️ Frontend Setup

### Step 1: Install Dependencies (from root directory)
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | `student@system.com` | `student` |
| Staff | `staff@system.com` | `staff` |
| Manager | `admin@system.com` | `admin` |

---

## 📡 API Documentation

**Base URL:** `http://localhost:55555/api`

### Authentication

All protected endpoints require a JWT token in the header:
```
Authorization: Bearer <your-jwt-token>
```

---

### Auth Endpoints

#### POST `/api/auth/register`
Register a new student account.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@kfupm.edu.sa",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john",
  "email": "john@kfupm.edu.sa",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Account created successfully"
}
```

---

#### POST `/api/auth/login`
Authenticate user and get JWT token.

**Request:**
```json
{
  "email": "student@system.com",
  "password": "student"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "student",
  "email": "student@system.com",
  "role": "student",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### Menu Endpoints

#### GET `/api/menu`
Get all menu items. Students see only available items; staff/managers see all.

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Grilled Chicken",
    "description": "Delicious grilled chicken with herbs",
    "category": "Main Course",
    "price": 25,
    "imagePath": "/menu_images/grilled-chicken.jpg",
    "isAvailable": true
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "French Fries",
    "description": "Crispy golden fries",
    "category": "Appetizers",
    "price": 10,
    "imagePath": "/menu_images/fries.jpg",
    "isAvailable": true
  }
]
```

---

#### POST `/api/menu` (Manager only)
Create a new menu item.

**Request:**
```json
{
  "name": "Beef Burger",
  "description": "Juicy beef patty with fresh vegetables",
  "category": "Main Course",
  "price": 30,
  "imagePath": "/menu_images/beef-burger.jpg",
  "isAvailable": true
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Beef Burger",
  "description": "Juicy beef patty with fresh vegetables",
  "category": "Main Course",
  "price": 30,
  "imagePath": "/menu_images/beef-burger.jpg",
  "isAvailable": true,
  "createdAt": "2025-12-06T10:30:00.000Z"
}
```

---

#### PATCH `/api/menu/:id/toggle` (Staff/Manager)
Toggle menu item availability.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Grilled Chicken",
  "isAvailable": false,
  "message": "Item availability updated"
}
```

---

### Order Endpoints (Student)

#### POST `/api/orders`
Create a new order.

**Request:**
```json
{
  "items": [
    { "name": "Grilled Chicken", "quantity": 2, "price": 25 },
    { "name": "French Fries", "quantity": 1, "price": 10 }
  ],
  "pickupTime": "12:30 PM",
  "specialInstructions": "Extra sauce please"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "orderId": "ORD-001",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    { "name": "Grilled Chicken", "quantity": 2, "price": 25 },
    { "name": "French Fries", "quantity": 1, "price": 10 }
  ],
  "pickupTime": "12:30 PM",
  "specialInstructions": "Extra sauce please",
  "status": "pending",
  "createdAt": "2025-12-06T10:35:00.000Z"
}
```

---

#### GET `/api/orders/current`
Get student's active orders (pending, preparing, ready).

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "orderId": "ORD-001",
    "items": [
      { "name": "Grilled Chicken", "quantity": 2, "price": 25 }
    ],
    "pickupTime": "12:30 PM",
    "status": "preparing",
    "createdAt": "2025-12-06T10:35:00.000Z"
  }
]
```

---

#### PATCH `/api/orders/:id/cancel`
Cancel a pending order.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "orderId": "ORD-001",
  "status": "cancelled",
  "cancelledAt": "2025-12-06T10:40:00.000Z",
  "canceledBy": "student"
}
```

---

### Staff Endpoints

#### GET `/api/staff/orders`
Get all active orders for staff to manage.

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "orderId": "ORD-001",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@kfupm.edu.sa"
    },
    "items": [
      { "name": "Grilled Chicken", "quantity": 2, "price": 25 }
    ],
    "pickupTime": "12:30 PM",
    "status": "pending",
    "createdAt": "2025-12-06T10:35:00.000Z"
  }
]
```

---

#### PATCH `/api/staff/orders/:id/status`
Update order status.

**Request:**
```json
{
  "status": "preparing"
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "orderId": "ORD-001",
  "status": "preparing",
  "updatedAt": "2025-12-06T10:45:00.000Z"
}
```

**Valid status values:** `pending`, `preparing`, `ready`, `picked`

---

### Manager Endpoints

#### GET `/api/manager/users`
Get all staff and manager users.

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439016",
    "username": "staff1",
    "email": "staff@system.com",
    "role": "staff",
    "createdAt": "2025-12-01T00:00:00.000Z"
  }
]
```

---

#### POST `/api/manager/users`
Create a new staff or manager account.

**Request:**
```json
{
  "username": "newstaff",
  "password": "password123",
  "role": "staff"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439017",
  "username": "newstaff",
  "email": "newstaff@system.com",
  "role": "staff",
  "message": "User created successfully"
}
```

---

#### GET `/api/manager/reports`
Get daily sales reports.

**Query Parameters:** `?date=2025-12-06` (optional)

**Response (200):**
```json
{
  "date": "2025-12-06",
  "totalOrders": 25,
  "completedOrders": 20,
  "cancelledOrders": 2,
  "pendingOrders": 3,
  "totalRevenue": 1250.50
}
```

---

## 📁 Project Structure

```
├── backend/
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, upload, validation
│   └── server.js        # Entry point
│
├── src/
│   ├── pages/           # React pages
│   ├── components/      # UI components
│   ├── lib/api.ts       # API client
│   └── App.tsx          # Main app
```

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Abdul Muhaymin** | Student Dashboard |
| **Shaheer Ahmar** | Admin Dashboard |
| **Ali Alsarhayd** | Auth & Staff Dashboard |

---

**Version:** 2.0.0 | **Status:** Full-Stack Complete
