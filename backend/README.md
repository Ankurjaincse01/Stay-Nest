# StayNest Backend 💻

This is the Node.js / Express.js based API service for the StayNest platform.

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Configuration:** Create a `.env` file with `ATLAS_DB` and `SECRET`.
3.  **Start Server:**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
backend/
├── config/       # Database & Cloudinary configuration
├── controllers/  # Core logic for auth, properties, & bookings
├── middleware/   # Auth, ownership, validation, error handling
├── models/       # Mongoose schemas (Listing, User, Review, Booking)
├── routes/       # API endpoints grouped by feature
├── utils/        # Global error classes & axios serializers
├── validations/  # Joi schemas for request body validation
└── server.js     # Express server setup & middleware registration
```

## 🛠 Tech Stack

- **Node.js** & **Express**
- **MongoDB** / **Mongoose**
- **Passport.js** (Authentication)
- **Cloudinary** (Image hosting)
- **Nominatim** (Geocoding / Maps)
- **Joi** (Server-side validation)
