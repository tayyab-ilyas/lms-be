# Lead Management System

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication (httpOnly cookies)
- bcrypt password hashing

### Frontend
- React 18 + Vite
- Tailwind CSS
- AG Grid Community
- React Router v6
- Axios + React Hook Form

## Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)

## Backend Setup

### Installation
```bash
git clone <backend-repo>
cd lead-management-backend
npm install
```
## Environment Variables
- Create .env:
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lead-management
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```
## Run Using
```bash
# Start server
npm run dev

# Seed database with 150 test leads
npm run seed
```
## API Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- GET /api/auth/me - Get current user
- GET /api/leads - Get leads (paginated, filtered)
- POST /api/leads - Create lead
- GET /api/leads/:id - Get single lead
- PUT /api/leads/:id - Update lead
- DELETE /api/leads/:id - Delete lead