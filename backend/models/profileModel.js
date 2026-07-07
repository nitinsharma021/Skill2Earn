const db = require("../config/db");

// Create Profile
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

// ⭐ Check if profile already exists
const checkProfileExists = (userId, callback) => {

    const sql = `
        SELECT id
        FROM profiles
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);

};

module.exports = {
    createProfile,
    checkProfileExists
};