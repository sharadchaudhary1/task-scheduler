# Task Scheduler - Backend Documentation

A robust Node.js/Express backend application for a comprehensive task scheduling system. Users can create, manage, and organize their daily and weekly tasks with authentication and real-time updates.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Helper Functions](#helper-functions)
- [Running the Server](#running-the-server)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**Task Scheduler** is a full-stack web application that allows users to:
- Register and authenticate securely
- Create tasks with titles, descriptions, priorities, and due dates
- Schedule tasks on a daily or weekly basis
- Update task status (pending, in progress, completed)
- Delete tasks they no longer need
- Track and manage all their tasks efficiently

This documentation covers the **backend API** built with Node.js and Express, connected to MongoDB for data persistence.

---

## 🛠 Tech Stack

### Backend Framework & Dependencies
- **Node.js** - JavaScript runtime
- **Express** (v5.2.1) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.4.1) - MongoDB ODM
- **JWT (jsonwebtoken)** (v9.0.3) - Token-based authentication
- **bcrypt** (v6.0.0) - Password hashing
- **CORS** (v2.8.6) - Cross-Origin Resource Sharing
- **cookie-parser** (v1.4.7) - Cookie middleware
- **body-parser** (v2.2.2) - Request body parsing
- **validator** (v13.15.35) - Data validation
- **dotenv** (v17.4.1) - Environment variable management

### Development Tools
- **Nodemon** (v3.1.14) - Auto-restart server during development

---

## 📁 Project Structure

```
task-scheduler/
├── app.js                  # Main application file & server entry point
├── config/
│   └── database.js         # MongoDB connection configuration
├── models/
│   ├── user.js            # User schema & model
│   └── tasks.js           # Task schema & model
├── routes/
│   ├── auth.js            # Authentication endpoints (register, login, logout)
│   └── tasks.js           # Task management endpoints (CRUD operations)
├── middleware/
│   └── user.js            # JWT authentication middleware
├── helper/
│   ├── user.js            # User data validation
│   └── tasks.js           # Task data validation
├── Frontend/              # React frontend application
├── .env                   # Environment variables (not in repo)
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── package-lock.json     # Locked dependency versions
└── README.md             # This file
```

---

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either locally installed or MongoDB Atlas account for cloud database
- **Git** - For version control

### Verify Installation
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/sharadchaudhary1/task-scheduler.git
cd task-scheduler
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all backend dependencies listed in `package.json`:
- express
- mongoose
- jsonwebtoken
- bcrypt
- cors
- cookie-parser
- body-parser
- validator
- dotenv
- nodemon

### Step 3: Create Environment File
Create a `.env` file in the root directory:
```bash
touch .env
```

### Step 4: Configure Environment Variables
Add the following to your `.env` file (see [Environment Variables](#environment-variables) section):

```
PORT=5000
DB_URL=your_mongodb_connection_string
JWT=your_jwt_secret_key
```

### Step 5: Start the Server
```bash
npm start
```

Expected output:
```
database connected successfully
server is started
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `DB_URL` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/task-scheduler` |
| `JWT` | Secret key for JWT token signing | `your-super-secret-jwt-key-min-32-chars` |

### Getting MongoDB Connection String

**Using MongoDB Atlas (Cloud):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Click "Connect" and copy your connection string
5. Replace `<password>` with your database password

**Using Local MongoDB:**
```
mongodb://localhost:27017/task-scheduler
```

---

## 💾 Database Models

### User Model
**File:** `models/user.js`

Stores user account information with password hashing.

```javascript
{
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail
  },
  password: {
    type: String,
    required: true,
    validate: isStrongPassword
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male"
  },
  timestamps: true  // createdAt, updatedAt
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Task Model
**File:** `models/tasks.js`

Stores task information linked to users.

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "progress", "completed"],
    default: "pending"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  dueDate: Date,
  userId: {
    type: ObjectId,
    ref: "user",
    required: true
  },
  timestamps: true  // createdAt, updatedAt
}
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000
```

---

### Authentication Endpoints
**Route:** `/auth`

#### 1. Register User
```
POST /auth/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "gender": "male"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully."
}
```

**Error Responses:**
- `409`: User already exists with this email
- `400`: Invalid input data
- `500`: Server error

---

#### 2. Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "gender": "male",
    "createdAt": "2026-04-11T12:00:00Z",
    "updatedAt": "2026-04-11T12:00:00Z"
  }
}
```

**Note:** JWT token is sent as an HTTP-only cookie

**Error Responses:**
- `400`: Missing credentials or invalid email format
- `401`: Invalid credentials or unregistered email
- `500`: Server error

---

#### 3. Logout User
```
POST /auth/logout
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "logged out successfully"
}
```

---

#### 4. Get Current User
```
GET /auth/getuser
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "gender": "male"
  }
}
```

**Error Responses:**
- `400`: Session expired or authentication required
- `500`: Server error

---

### Task Management Endpoints
**Route:** `/tasks`

**Note:** All task endpoints require authentication (JWT token in cookies)

---

#### 1. Create Task
```
POST /tasks
Content-Type: application/json
Cookie: token=<jwt_token>

{
  "title": "Complete project report",
  "description": "Finish the quarterly report",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-04-30"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "task created successfully",
  "task": {
    "_id": "task_id",
    "title": "Complete project report",
    "description": "Finish the quarterly report",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-04-30T00:00:00Z",
    "userId": "user_id",
    "createdAt": "2026-04-11T12:00:00Z",
    "updatedAt": "2026-04-11T12:00:00Z"
  }
}
```

**Validation Rules:**
- `title`: Required, cannot be empty
- `dueDate`: Required, must be in YYYY-MM-DD format, cannot be in the past
- `status`: Optional (pending, progress, completed)
- `priority`: Optional (low, medium, high)

**Error Responses:**
- `400`: Validation failed (missing title, invalid date, past date)
- `400`: Authentication required
- `500`: Server error

---

#### 2. Get All Tasks
```
GET /tasks
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "task_id_1",
      "title": "Task 1",
      "status": "pending",
      "priority": "high",
      "dueDate": "2026-04-30T00:00:00Z",
      "userId": "user_id",
      "createdAt": "2026-04-11T12:00:00Z"
    }
    // ... more tasks
  ]
}
```

**Error Responses:**
- `400`: Authentication required
- `500`: Server error

---

#### 3. Update Task
```
PATCH /tasks/:id
Content-Type: application/json
Cookie: token=<jwt_token>

{
  "status": "progress",
  "priority": "medium"
}
```

**Allowed Fields for Update:**
- `title`
- `description`
- `status`
- `priority`
- `dueDate`

**Success Response (200):**
```json
{
  "success": true,
  "message": "task updated successfully",
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "status": "progress",
    "priority": "medium",
    "dueDate": "2026-04-30T00:00:00Z",
    "updatedAt": "2026-04-11T12:30:00Z"
  }
}
```

**Error Responses:**
- `400`: Invalid task ID format or invalid updates
- `404`: Task not found
- `400`: Authentication required
- `500`: Server error

---

#### 4. Delete Task
```
DELETE /tasks/:id
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "task deleted successfully"
}
```

**Error Responses:**
- `400`: Invalid task ID format
- `404`: Task not found
- `400`: Authentication required
- `500`: Server error

---

#### 5. Get Single Task
```
GET /tasks/gettask/:id
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-04-30T00:00:00Z",
    "userId": "user_id",
    "createdAt": "2026-04-11T12:00:00Z",
    "updatedAt": "2026-04-11T12:00:00Z"
  }
}
```

---

#### 6. Get Completed Tasks
```
GET /tasks/completed
Cookie: token=<jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "task_id",
      "title": "Completed task",
      "status": "completed",
      "priority": "low",
      "dueDate": "2026-04-10T00:00:00Z",
      "userId": "user_id"
    }
    // ... more completed tasks
  ]
}
```

---

## 🔐 Authentication

### JWT Authentication Flow

1. **Registration**: User creates account with email and password
2. **Password Hashing**: Password is hashed using bcrypt (10 rounds)
3. **Login**: User provides email and password
4. **Token Generation**: JWT token is created with 30-day expiration
5. **Cookie Storage**: Token stored as HTTP-only cookie
6. **Protected Routes**: Token validated on each protected endpoint request

### How JWT Works in This App

```
User Login
    ↓
Verify Email & Password
    ↓
Generate JWT Token: jwt.sign({_id: user._id}, process.env.JWT, {expiresIn: "30d"})
    ↓
Set HTTP-only Cookie
    ↓
Cookie automatically sent with each request
    ↓
Middleware verifies token
    ↓
Access granted to protected endpoints
```

### Token Expiration
- Tokens expire after **30 days**
- Users must login again after expiration
- Logout immediately clears the cookie

---

## 🔧 Middleware

### User Authentication Middleware
**File:** `middleware/user.js`

Protects routes requiring user authentication.

```javascript
const userAuth = async (req, res, next) => {
  // Checks for valid JWT token in cookies
  // Validates token signature and expiration
  // Attaches user object to req.user
  // Passes control to next middleware/route handler
}
```

**Usage:**
```javascript
router.get("/protected-route", userAuth, (req, res) => {
  // req.user contains authenticated user
})
```

**Error Handling:**
- Returns 400 status if session expired
- Returns 400 status if no authentication token found
- Returns error message if user not found in database

---

## 📝 Helper Functions

### User Validation Helper
**File:** `helper/user.js`

Validates user registration data.

**Validations:**
- `firstname`: Required, minimum 3 characters
- `email`: Required, must be valid email format
- `password`: Required, must be strong (min 8 chars, uppercase, lowercase, number, symbol)

```javascript
validateUserData(req) // Throws error if validation fails
```

---

### Task Validation Helper
**File:** `helper/tasks.js`

Validates task creation/update data.

**Validations:**
- `title`: Required, cannot be empty
- `dueDate`: Required, must be valid ISO8601 date (YYYY-MM-DD)
- `dueDate`: Cannot be in the past

```javascript
validateTasks(req) // Throws error if validation fails
```

---

## ▶️ Running the Server

### Production Mode
```bash
npm start
```
Runs directly with Node.js (faster, no auto-reload)

### Development Mode
```bash
npm run dev
```
Runs with Nodemon for automatic restart on file changes

### Access the Server
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Server Output
```
database connected successfully
server is started
```

If you see errors, check:
1. MongoDB connection string in `.env`
2. Port availability (5000 not in use)
3. Environment variables properly set

---

## 👨‍💻 Development

### Making Code Changes

1. **Create a new branch** for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes** to the code

3. **Test your changes**:
```bash
npm run dev
```

4. **Commit changes**:
```bash
git add .

5. **Push to GitHub**:
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request** on GitHub

### Testing API Endpoints

Use tools like:
- **Postman** - GUI for API testing
- **cURL** - Command-line tool
- **Insomnia** - API client
- **Thunder Client** - VS Code extension

Example cURL request:
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstname":"John",
    "email":"john@example.com",
    "password":"SecurePass123!",
    "gender":"male"
  }'
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Follow existing code patterns
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 📞 Support & Contact

For questions or issues:
- Open an issue on [GitHub Issues](https://github.com/sharadchaudhary1/task-scheduler/issues)
- Contact: sharad choudhary

---

## 🎉 Happy Coding!

Thank you for using Task Scheduler. We hope it helps you manage your tasks efficiently!

---

**Last Updated:** April 11, 2026
**Author:** Sharad Choudhary
**Repository:** [sharadchaudhary1/task-scheduler](https://github.com/sharadchaudhary1/task-scheduler)