const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../utils/serializers");

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// POST /auth/signup
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const displayName = name?.trim() || normalizedEmail.split("@")[0];

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const user = await User.create({
      name: displayName,
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: `Welcome to StayNest, ${displayName}!`,
      token,
      user: sanitizeUser(user),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST /auth/login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user (include password for comparison)
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: sanitizeUser(user),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// GET /auth/logout  (client just deletes the token — server confirms)
module.exports.logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully." });
};

// GET /auth/current-user  (requires token in header)
module.exports.getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: true, user: null });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.json({ success: true, user: sanitizeUser(user) });
  } catch {
    // Invalid / expired token — treat as not logged in
    res.json({ success: true, user: null });
  }
};
