const { GoogleGenerativeAI } = require("@google/generative-ai");
const resumePrompt = require("../prompts/resumePrompt");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractResumeData(resumeText) {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const prompt = resumePrompt(resumeText);

    const result = await model.generateContent(prompt);

    let response = result.response.text();

    response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(response);
}

module.exports = {
    extractResumeData
};