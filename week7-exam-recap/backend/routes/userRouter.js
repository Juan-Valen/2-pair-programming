const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");

// // Middleware to protect routes
// const requireAuth = require("../middleware/requireAuth");

// Public routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// // Protected route
// router.get("/me", requireAuth, getMe);

module.exports = router;
