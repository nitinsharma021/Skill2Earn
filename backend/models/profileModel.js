const db = require("../config/db");

const createProfile = (profile, callback) => {

    const sql = `
        INSERT INTO profiles
        (
            user_id,
            phone,
            whatsapp,
            category,
            experience,
            location,
            price,
            about,
            availability,
            profile_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            profile.user_id,
            profile.phone,
            profile.whatsapp,
            profile.category,
            profile.experience,
            profile.location,
            profile.price,
            profile.about,
            profile.availability,
            profile.profile_image
        ],
        callback
    );
};

module.exports = {
    createProfile
};