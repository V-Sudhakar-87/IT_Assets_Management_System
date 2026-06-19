const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();
const Employee =require("../models/Employee");

// Register Route

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      secretKey
    } = req.body;

    if(secretKey !== process.env.ADMIN_SECRET_KEY){

      return res.status(400).json({
        success:false,
        message:"Invalid Secret Key"
      });

    }

    const existingUser =
      await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({
        success:false,
        message:"Email already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password:hashedPassword,
      role:"admin"
    });

    await user.save();

    res.json({
      success:true,
      message:"Admin Created Successfully"
    });

  } catch(err){

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
// Login Route
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    let user =
await User.findOne({ email });

if(!user){

    user =
    await Employee.findOne({ email });

}
      

    if (!user) {

      return res.json({
        success: false,
        message: "User Not Found"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Wrong Password"
      });

    }

    res.json({
      success: true,
      user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});


router.put(
"/update-profile",
async(req,res)=>{

try{

    const {

        userId,
        name,
        email,
        oldPassword,
        newPassword,
        secretKey

    } = req.body;

    const user =
    await User.findById(
    userId
    );

    if(!user){

        return res.json({

            success:false,

            message:
            "User Not Found"

        });

    }

    const validPassword =
    await bcrypt.compare(

        oldPassword,

        user.password

    );

    if(!validPassword){

        return res.json({

            success:false,

            message:
            "Old Password Incorrect"

        });

    }

    if(

        secretKey !==
        process.env.ADMIN_SECRET_KEY

    ){
       
        return res.json({

            success:false,

            message:
            "Invalid Secret Key"

        });
        

    }

    user.name = name;

    user.email = email;

    if(

        newPassword &&
        newPassword.trim() !== ""

    ){

        user.password =
        await bcrypt.hash(

            newPassword,

            10

        );

    }

    await user.save();

    res.json({

        success:true,

        message:
        "Profile Updated Successfully"

    });
    console.log("Frontend:", secretKey);
console.log("ENV:", process.env.ADMIN_SECRET_KEY);

}
catch(err){

    res.status(500).json({

        success:false,

        message:err.message

    });

}

});
module.exports = router;