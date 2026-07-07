const db = require("../config/db");

// Get All Providers
const getAllProviders = (callback) => {

    const sql = `
        SELECT
            users.id,
            users.full_name,
            users.email,
            profiles.phone,
            profiles.whatsapp,
            profiles.category,
            profiles.experience,
            profiles.location,
            profiles.price,
            profiles.about,
            profiles.availability
        FROM users
        INNER JOIN profiles
            ON users.id = profiles.user_id
        WHERE users.role = 'provider'
    `;

    db.query(sql, callback);
};

// Get Single Provider
const getProviderById = (id, callback) => {

    const sql = `
        SELECT
            users.id,
            users.full_name,
            users.email,
            profiles.phone,
            profiles.whatsapp,
            profiles.category,
            profiles.experience,
            profiles.location,
            profiles.price,
            profiles.about,
            profiles.availability
        FROM users
        INNER JOIN profiles
            ON users.id = profiles.user_id
        WHERE users.id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getAllProviders,
    getProviderById
};