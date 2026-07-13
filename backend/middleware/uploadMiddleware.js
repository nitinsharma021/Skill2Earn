const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({

    // Folder where files will be saved
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Rename file to avoid duplicate names
    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }

});

// Allow only PDF files
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }

};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;