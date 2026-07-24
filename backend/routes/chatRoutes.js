const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createOrGetConversation,
    sendMessage,
    getMessages
} = require("../controllers/chatController");

// Create or Get Conversation
router.post("/conversation", authMiddleware, createOrGetConversation);

// Send Message
router.post("/message", authMiddleware, sendMessage);

// Get Messages
router.get("/conversation/:conversationId/messages", authMiddleware, getMessages);

module.exports = router;