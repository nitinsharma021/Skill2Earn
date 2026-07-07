const express = require("express");
const router = express.Router();

const {
    createProfile,
    checkProfile
} = require("../controllers/profileController");

// Create Profile
router.post("/", createProfile);

// ⭐ Check Profile Exists
router.get("/check/:userId", checkProfile);

module.exports = router;