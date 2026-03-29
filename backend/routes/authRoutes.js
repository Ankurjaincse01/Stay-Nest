const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");

router.post("/signup", wrapAsync(authController.signup));
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/current-user", authController.getCurrentUser);

module.exports = router;
