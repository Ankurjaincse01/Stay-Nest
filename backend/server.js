const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/database");
const { notFoundHandler, errorHandler } = require("./middleware");

// Route files
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// CORS for ALL (to avoid any frontend issues)
app.use(cors());

// Body Parsers
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Base route for connectivity check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Backend is healthy" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/listings", propertyRoutes);
app.use("/bookings", bookingRoutes);

// Root route (Fallback)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to StayNest API" });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is live on port ${PORT}`);
});
