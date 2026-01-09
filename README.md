# 🎉 Event Management Platform

A full-stack event management platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform enables users to browse events, book tickets, manage their profiles, and allows organizers to create and manage events seamlessly.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)

## ✨ Features

### For Attendees
- 🔍 **Browse Events** - Discover and search through available events
- 🎫 **Book Tickets** - Easy ticket booking with real-time availability
- 👤 **User Profiles** - Manage personal information and view booking history
- 📧 **Contact Support** - Get in touch with organizers or support team

### For Organizers
- 📝 **Event Creation** - Create and publish events with detailed information
- 📊 **Dashboard** - Comprehensive dashboard to manage events and bookings
- 👥 **Attendee Management** - View and manage event registrations
- 📈 **Analytics** - Track event performance and attendance

### Admin Features
- 🛡️ **Admin Panel** - Centralized control for platform management
- ✅ **Event Approval** - Review and approve organizer-created events
- 👥 **User Management** - Manage users and organizers

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/caanya-05/Event-Management-Platform.git
cd Event-Management-Platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and update with your MongoDB URI
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-management
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/event-management
NODE_ENV=development
```

```bash
# Start the backend server
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Event-Management-Platform/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── eventController.js # Event logic
│   │   └── userController.js  # User logic
│   ├── middleware/
│   │   └── errorMiddleware.js # Error handling
│   ├── models/
│   │   ├── eventModel.js      # Event schema
│   │   └── userModel.js       # User schema
│   ├── routes/
│   │   ├── eventRoutes.js     # Event endpoints
│   │   └── userRoutes.js      # User endpoints
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/               # API integration
│   │   ├── components/        # Reusable components
│   │   ├── lib/               # Utilities and context
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── EventsPage.tsx
│   │   │   ├── EventDetailsPage.tsx
│   │   │   ├── BookingPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── OrganizerDashboard.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── styles/            # Global styles
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # Entry point
│   ├── public/                # Static assets
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (Organizer)
- `PUT /api/events/:id` - Update event (Organizer)
- `DELETE /api/events/:id` - Delete event (Organizer/Admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/bookings` - Get user bookings

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `DELETE /api/bookings/:id` - Cancel booking

## 🎨 Features in Detail

### Event Browsing
Users can browse through a curated list of events with filtering and search capabilities. Each event displays key information including date, location, price, and availability.

### Booking System
The platform features a robust booking system that handles:
- Real-time seat availability
- Multiple ticket types
- Secure booking confirmation
- Booking history tracking

### Organizer Dashboard
Organizers have access to a comprehensive dashboard featuring:
- Event creation and management
- Attendee list and analytics
- Revenue tracking
- Event performance metrics

### User Profile Management
Users can manage their profiles with features like:
- Personal information updates
- Booking history
- Saved events
- Notification preferences

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key (if using authentication)
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```

The build files will be in the `frontend/dist` directory.

### Backend
```bash
cd backend
npm start
```

For production, consider using PM2 or similar process managers.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Chaithanya S** - [caanya-05](https://github.com/caanya-05)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or support, please contact through the repository issues or reach out via the contact page in the application.

---

⭐ If you found this project helpful, please consider giving it a star!
