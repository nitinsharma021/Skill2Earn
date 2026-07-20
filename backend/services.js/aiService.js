const { GoogleGenerativeAI } = require("@google/generative-ai");
const resumePrompt = require("../prompts/resumePrompt");

function buildFallbackResumeData(resumeText) {
    const lines = resumeText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const firstLine = lines[0] || "";
    const emailMatch = resumeText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = resumeText.match(/\+?\d[\d\s().-]{7,}\d/);
    const locationMatch = resumeText.match(/\b(New Delhi|Delhi|Mumbai|Bengaluru|Bangalore|Chennai|Hyderabad|Kolkata|Pune|Noida|Gurgaon|Gurugram|Ahmedabad|Jaipur)\b/i);
    const categoryMatch = resumeText.match(/(developer|designer|teacher|tailor|driver|carpenter|electrician|plumber|mechanic|photographer|cook|cleaning|painter)/i);
    const professionMatch = lines.find((line) => /developer|designer|teacher|tailor|driver|carpenter|electrician|plumber|mechanic|photographer|cook|cleaning|painter/i.test(line));
    const experienceMatch = resumeText.match(/(\d+)\s*(years?|yrs?)\s*(of)?\s*experience/i);

    return {
        profile: {
            name: firstLine || "",
            email: emailMatch ? emailMatch[0] : "",
            phone: phoneMatch ? phoneMatch[0] : "",
            profession: professionMatch || "",
            category: categoryMatch ? categoryMatch[1].charAt(0).toUpperCase() + categoryMatch[1].slice(1) : "Other",
            experience: experienceMatch ? `${experienceMatch[1]} years` : "",
            location: locationMatch ? locationMatch[0] : "",
            summary: "Resume uploaded successfully. AI analysis unavailable, using fallback profile extraction.",
            suggestedPrice: "",
            availability: "Available"
        },
        skills: [],
        education: [],
        projects: [],
        analysis: {
            profileScore: 40,
            confidenceScore: 40,
            strengths: ["Resume text detected"],
            missingFields: ["AI analysis unavailable"],
            recommendations: ["Please review the extracted profile details before saving."]
        }
    };
}

async function extractResumeData(resumeText) {
    if (!process.env.GEMINI_API_KEY) {
        return buildFallbackResumeData(resumeText);
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
    });

    const prompt = resumePrompt(resumeText);

    try {
        const result = await model.generateContent(prompt);

        let response = result.response.text();

        response = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(response);
    } catch (error) {
        console.warn("Gemini AI request failed, using fallback resume data:", error.message);
        return buildFallbackResumeData(resumeText);
    }
}

module.exports = {
    extractResumeData,
    buildFallbackResumeData
};