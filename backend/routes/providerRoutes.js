const express = require("express");
const router = express.Router();

const {
    getProviders,
    getProvider
} = require("../controllers/providerController");

// Get all providers
router.get("/", getProviders);

// Get single provider by ID
router.get("/:id", getProvider);

module.exports = router;