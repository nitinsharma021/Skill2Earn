const profileModel = require("../models/profileModel");

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

module.exports = {
    createProfile
};