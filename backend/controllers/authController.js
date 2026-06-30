const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const createToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET || "skill2earn-secret",
        {
            expiresIn: "1d"
        }
    );
};

// REGISTER
const register = (req, res) => {

    const { full_name, email, password, role } = req.body;

    userModel.findUserByEmail(email, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = {
            full_name,
            email,
            password: hashedPassword,
            role
        };

        userModel.createUser(user, (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Registration Failed"
                });
            }

            res.status(201).json({
                message: "User Registered Successfully"
            });

        });

    });

};

// LOGIN
const login = (req, res) => {

    const { email, password } = req.body;

    userModel.findUserByEmail(email, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = results[0];
        const storedPassword = user.password || "";

        const isMatch = bcrypt.compareSync(password, storedPassword);
        const isLegacyMatch = storedPassword && password === storedPassword;

        if (!isMatch && !isLegacyMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = createToken(user);

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                ...user,
                password: undefined
            }
        });

    });

};

module.exports = {
    register,
    login
};