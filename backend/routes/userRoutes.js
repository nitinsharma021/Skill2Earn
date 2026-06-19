const protect = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();


const {

register,

login

} = require("../controllers/authController");

router.get("/profile",protect,(req,res)=>{


res.json({

message:"Profile Accessed",

user:req.user

});


});



router.post("/register", register);


router.post("/login", login);



module.exports = router;