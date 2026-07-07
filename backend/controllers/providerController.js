const providerModel = require("../models/providerModel");

// Get All Providers
const getProviders = (req, res) => {

    providerModel.getAllProviders((err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.status(200).json(results);

    });

};

// Get Single Provider
const getProvider = (req, res) => {

    const { id } = req.params;

    providerModel.getProviderById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Provider Not Found"
            });
        }

        res.status(200).json(results[0]);

    });

};

module.exports = {
    getProviders,
    getProvider
};