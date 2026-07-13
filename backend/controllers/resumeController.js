const parseResume = require("../utils/pdfParser");
const { extractResumeData } = require("../services/aiService");
const formatProfile = require("../utils/profileFormatter");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No resume uploaded"
            });
        }

        // Step 1: Extract text from PDF
        const resumeText = await parseResume(req.file.path);

        // Step 2: AI Analysis
        const aiResponse = await extractResumeData(resumeText);

        // Step 3: Format Profile
        const profile = formatProfile(aiResponse.profile);

        // Step 4: Send Response
        res.status(200).json({
            success: true,
            profile,
            resume: {
                skills: aiResponse.skills || [],
                education: aiResponse.education || [],
                projects: aiResponse.projects || []
            },
            analysis: aiResponse.analysis
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Resume parsing failed"
        });

    }

};

module.exports = {
    uploadResume
};