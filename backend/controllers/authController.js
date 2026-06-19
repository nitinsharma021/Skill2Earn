const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../data/users");


// REGISTER
const register = (req, res) => {

    const { name, email, password } = req.body;


    // Check existing user
    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {

        return res.status(400).json({

            message: "User already exists"

        });

    }


    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);


    const user = {

        id: Date.now(),

        name,

        email,

        password: hashedPassword

    };


    users.push(user);


    res.status(201).json({

        message: "User Registered",

        user

    });

};




// LOGIN
const login = (req, res) => {


    const { email, password } = req.body;



    const user = users.find(

        user => user.email === email

    );



    if (!user) {


        return res.status(404).json({

            message: "User not found"

        });

    }



    const isMatch = bcrypt.compareSync(

        password,

        user.password

    );



    if (!isMatch) {


        return res.status(401).json({

            message: "Invalid Credentials"

        });

    }



    const token = jwt.sign(

{

id:user.id,

email:user.email

},

process.env.JWT_SECRET,

{

expiresIn:"1d"

}

);



res.status(200).json({

message:"Login Successful",

token,

user

});

};




module.exports = {

    register,

    login

};