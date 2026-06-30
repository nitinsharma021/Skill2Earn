const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    register,
    login
} = require("../controllers/authController");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "Profile Accessed Successfully",
        user: req.user
    });
});

module.exports = router;