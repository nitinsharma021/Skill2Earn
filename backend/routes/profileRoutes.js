const express = require("express");
const router = express.Router();

const {
    createProfile,
    checkProfile,
    getProfile,
    updateProfile
} = require("../controllers/profileController");

// Create Profile
router.post("/", createProfile);

// Check if profile exists
router.get("/check/:userId", checkProfile);

// Get profile by user id
router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);

module.exports = router;