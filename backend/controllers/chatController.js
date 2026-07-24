const chatModel = require("../models/chatModel");

// Create or Get Conversation
const createOrGetConversation = async (req, res) => {
    try {
        const clientId = req.user.id;
        const { providerId } = req.body;

        // Validation
        if (!providerId) {
            return res.status(400).json({
                success: false,
                message: "Provider ID is required."
            });
        }

        // Check if conversation already exists
        const existingConversation = await chatModel.getConversation(
            clientId,
            providerId
        );

        if (existingConversation) {
            return res.status(200).json({
                success: true,
                message: "Conversation already exists.",
                conversation: existingConversation
            });
        }

        // Create new conversation
        const conversationId = await chatModel.createConversation(
            clientId,
            providerId
        );

        return res.status(201).json({
            success: true,
            message: "Conversation created successfully.",
            conversationId
        });

    } catch (error) {
        console.error("Chat Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Send Message
const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { conversationId, message } = req.body;

        // Validation
        if (!conversationId || !message) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID and message are required."
            });
        }

        const messageId = await chatModel.createMessage(
            conversationId,
            senderId,
            message
        );

        return res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            messageId
        });

    } catch (error) {
        console.error("Send Message Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Messages
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        if (!conversationId) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required."
            });
        }

        const messages = await chatModel.getMessages(conversationId);

        return res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.error("Get Messages Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createOrGetConversation,
    sendMessage,
    getMessages
};