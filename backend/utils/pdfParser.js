const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const parseResume = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const pdf = new PDFParse({
        data: dataBuffer,
        verbosity: 0
    });

    const result = await pdf.getText();
    return result.text;
};

module.exports = parseResume;