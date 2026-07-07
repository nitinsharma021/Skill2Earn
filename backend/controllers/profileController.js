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

};

// ⭐ Check Profile Exists
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

module.exports = {
    createProfile,
    checkProfile
};