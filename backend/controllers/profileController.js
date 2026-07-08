const profileModel = require("../models/profileModel");

// Create Profile
const createProfile = (req, res) => {

    const {
        user_id,
        phone,
        whatsapp,
        category,
        experience,
        location,
        price,
        about,
        availability
    } = req.body;

    const profile = {
        user_id,
        phone,
        whatsapp,
        category,
        experience,
        location,
        price,
        about,
        availability,
        profile_image: ""
    };

    // Check if profile already exists
    profileModel.checkProfileExists(user_id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length > 0) {
            return res.status(400).json({
                message: "Profile already exists"
            });
        }

        // Create Profile
        profileModel.createProfile(profile, (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Profile Creation Failed"
                });
            }

            res.status(201).json({
                message: "Profile Created Successfully"
            });

        });

    });

};

// Check Profile Exists
const checkProfile = (req, res) => {

    const { userId } = req.params;

    profileModel.checkProfileExists(userId, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.status(200).json({
            exists: results.length > 0
        });

    });

};

// Get Profile
const getProfile = (req, res) => {

    const { userId } = req.params;

    profileModel.getProfileByUserId(userId, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Profile Not Found"
            });
        }

        res.status(200).json(results[0]);

    });

};

// Update Profile
const updateProfile = (req, res) => {

    const { userId } = req.params;

    const {
        phone,
        whatsapp,
        category,
        experience,
        location,
        price,
        about,
        availability
    } = req.body;

    const profile = {
        phone,
        whatsapp,
        category,
        experience,
        location,
        price,
        about,
        availability
    };

    profileModel.updateProfile(userId, profile, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Profile Update Failed"
            });
        }

        res.status(200).json({
            message: "Profile Updated Successfully"
        });

    });

};

module.exports = {
    createProfile,
    checkProfile,
    getProfile,
    updateProfile
};