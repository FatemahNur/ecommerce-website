# E-commerce Website

A full-stack e-commerce website built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (Register/Login)
- Product listing and details
- Shopping cart functionality
- Secure checkout process
- Responsive design
- Admin dashboard for product management

## Tech Stack

- Frontend: React.js, Redux Toolkit, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Payment Processing: Stripe

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Create a .env file in the backend directory with your environment variables
5. Start the development servers:
   - Frontend: `npm start` (in frontend directory)
   - Backend: `npm start` (in backend directory)

## Environment Variables

Create a .env file in the backend directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Deployment

The application can be deployed using platforms like Heroku, Vercel, or any other hosting service of your choice.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
