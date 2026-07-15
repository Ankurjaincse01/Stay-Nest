const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sanitizeUser } = require("../utils/serializers");
const { sendPasswordResetEmail } = require("../utils/emailSender");

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

    // Find user
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

// GET /auth/logout
module.exports.logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully." });
};

// GET /auth/current-user
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
    // Invalid/expired token — treat as not logged in
    res.json({ success: true, user: null });
  }
};

// POST /auth/forgot-password
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    // Return success even if user not found (prevent email enumeration)
    if (!user) {
      return res.json({
        success: true,
        message: "If this email is registered, you will receive a reset link shortly.",
      });
    }

    // Generate hashed reset token (1 hour expiry)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontendUrl}/reset-password/${resetToken}`;

    const emailSent = await sendPasswordResetEmail(user.email, resetLink);

    if (!emailSent) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: "Failed to send reset email. Please try again." });
    }

    res.json({
      success: true,
      message: "If this email is registered, you will receive a reset link shortly.",
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST /auth/reset-password/:token
module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    // Hash token to compare with stored value
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Reset link is invalid or has expired." });
    }

    // Update password and clear reset token
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successfully! You can now log in." });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
