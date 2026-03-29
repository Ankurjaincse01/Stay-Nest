const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const { sanitizeUser } = require("../utils/serializers");

// Get user profile information
module.exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ExpressError(404, "User not found.");
  }

  res.json({ success: true, user: sanitizeUser(user) });
};

// Update user profile information
module.exports.updateProfile = async (req, res) => {
  let updatedUser;

  try {
    const { name, email } = req.body;
    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(name ? { name: name.trim() } : {}),
        ...(email ? { email: email.trim().toLowerCase() } : {}),
      },
      { new: true }
    );
  } catch (e) {
    if (e.code !== 11000) {
      throw e;
    }

    res.status(409).json({ success: false, message: e.message });
    return;
  }

  if (!updatedUser) {
    throw new ExpressError(404, "User not found.");
  }

  res.json({
    success: true,
    message: "Profile updated successfully.",
    user: sanitizeUser(updatedUser),
  });
};

// Get detailed user information
module.exports.getUserDetails = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ExpressError(404, "User not found.");
  }

  res.json({ success: true, user: sanitizeUser(user) });
};
