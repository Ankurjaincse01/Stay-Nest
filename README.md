# StayNest 🏠

A modern property rental platform (Airbnb-style) built using the MERN stack. Features include secure JWT authentication, property listings, interactive maps, and a real-time booking system.

## 🚀 Key Features

- **🛡️ Secure JWT Authentication:** Stateless user sessions with JSON Web Tokens (Replaced Passport.js).
- **📂 Property Management:** Full CRUD operations for listings with Cloudinary image integration.
- **📍 Interactive Maps:** Real-time location pinning using Leaflet and Nominatim geocoding.
- **📅 Smart Booking System:** Date-range booking with live price calculations and **Double-Booking Prevention**.
- **⭐ Review System:** User ratings and comments for every property.
- **☁️ Cloud Integrated:** Persistent image storage via Cloudinary and MongoDB Atlas.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Axios (Centralized with interceptors)
- React-Leaflet (Maps)
- React-Toastify (Notifications)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- **JWT (Authentication)** + Bcryptjs (Security)
- Cloudinary & Multer (Storage)

## 📦 Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file with following keys:
PORT=4000
ATLAS_DB=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Make sure src/api/axios.js matches backend port (4000)
npm run dev
```

## 📂 Project Structure

```text
StayNest/
├── backend/
│   ├── config/        (DB & Cloudinary config)
│   ├── controllers/   (JWT Auth, Listings, Bookings logic)
│   ├── middleware/    (JWT verify, Overlap checks)
│   ├── models/        (Schemas: User, Listing, Review, Booking)
│   ├── routes/        (API endpoints)
│   └── server.js      (Stateless Express Server)
├── frontend/
│   └── src/
│       ├── api/       (Central Axios with Interceptors)
│       ├── components/ (Modular UI: BookingCard, Map, etc.)
│       ├── pages/      (Views: Home, Login, ListingDetails)
│       └── App.jsx     (Auth State Management)
```

## 🔒 Key API Endpoints (Port 4000)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/register` | POST | Public | New user signup |
| `/auth/login` | POST | Public | User login (returns JWT) |
| `/listings` | GET | Public | Fetch all properties |
| `/listings` | POST | JWT | Create new property |
| `/bookings/listings/:id/book` | POST | JWT | Book a property (No overlaps) |
| `/bookings/my-bookings` | GET | JWT | View user's bookings |

## 🌟 Quick Start

1. Configure `.env` in the `backend/` folder.
2. Seed the database (Optional): `node sampleListings/seed.js`
3. Run Backend (`port 4000`) and Frontend (`port 5173/5174`).
4. Enjoy!

## 📜 License
Educational use for property management systems.
