const User = require("../models/user");
const passport = require("passport");
const { sanitizeUser } = require("../utils/serializers");

// Handle user signup
module.exports.signup = async (req, res, next) => {
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

    const user = new User({ email: normalizedEmail, name: displayName });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json({
        success: true,
        message: `Welcome to StayNest, ${displayName}!`,
        user: sanitizeUser(registeredUser),
      });
    });
  } catch (e) {
    const statusCode = e.code === 11000 || e.name === "UserExistsError" ? 409 : 400;
    res.status(statusCode).json({ success: false, message: e.message });
  }
};

// Handle user login
module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info?.message || "Invalid email or password.",
      });
    }

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);

      res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: sanitizeUser(user),
      });
    });
  })(req, res, next);
};

// Handle user logout
module.exports.logout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json({ success: true, message: "Already logged out." });
  }

  req.logout((err) => {
    if (err) return next(err);
    res.json({ success: true, message: "Logged out successfully." });
  });
};

module.exports.getCurrentUser = (req, res) => {
  res.json({ success: true, user: sanitizeUser(req.user) });
};
