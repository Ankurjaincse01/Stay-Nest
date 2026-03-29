const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// User profile routes
router.route("/profile")
  .get(isLoggedIn, wrapAsync(userController.getProfile))
  .put(isLoggedIn, wrapAsync(userController.updateProfile));

// User details route
router.get("/details", isLoggedIn, wrapAsync(userController.getUserDetails));

module.exports = router;
