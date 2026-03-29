const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
require("dotenv").config();

const cors = require("cors");

const connectDB = require("./config/database");
const { notFoundHandler, errorHandler } = require("./middleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const User = require("./models/user");

const app = express();

// Database connection
connectDB();

// Middleware
// Enable CORS for frontend (Vite default: http://localhost:5173)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Session configuration
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.ATLAS_DB }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
};

app.use(session(sessionOptions));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/listings", propertyRoutes);
app.use("/bookings", bookingRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({ success: true, message: "StayNest backend API is running." });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
