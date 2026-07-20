const parseResume = require("../utils/pdfParser");
const { extractResumeData } = require("../services.js/aiService");
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
        let aiResponse = null;
        try {
            aiResponse = await extractResumeData(resumeText);
        } catch (aiError) {
            console.warn("Resume AI analysis failed, using fallback response:", aiError.message);
            aiResponse = {
                profile: {},
                skills: [],
                education: [],
                projects: [],
                analysis: {
                    profileScore: 0,
                    confidenceScore: 0,
                    strengths: [],
                    missingFields: ["Resume analysis unavailable"],
                    recommendations: ["Please upload a valid PDF or try again later."]
                }
            };
        }

        // Step 3: Format Profile
        const profile = formatProfile(aiResponse.profile || {});

        // Step 4: Send Response
        res.status(200).json({
            success: true,
            profile,
            resume: {
                skills: aiResponse.skills || [],
                education: aiResponse.education || [],
                projects: aiResponse.projects || []
            },
            analysis: aiResponse.analysis || {}
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