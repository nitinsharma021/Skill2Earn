const express = require("express");
const profileRoutes = require("./routes/profileRoutes");
const cors = require("cors");
const providerRoutes = require("./routes/providerRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const chatRoutes = require("./routes/chatRoutes");
require("dotenv").config();

const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON payload" });
    }
    next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("Skill2Earn Backend Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});