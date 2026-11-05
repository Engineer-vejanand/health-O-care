const User = require("../models/user.model.js"); // models 
const Doctor = require("../models/doctor.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken.js')

module.exports.registerUser = async function (req, res) {
  try {
    const { name, email, password, role, specialization, qualifications, experience, availability } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already has an account. Please log in.");
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (role === 'doctor') {
      if (!specialization || !qualifications || !experience || !availability) {
        return res.status(400).send("Doctor-specific fields are required.");
      }

      await Doctor.create({
        user: newUser._id,
        specialization,
        qualifications: qualifications.split(',').map((q) => q.trim()), 
        experience: parseInt(experience, 10),
        availability: JSON.parse(availability),
      });
    }

    const token = generateToken(newUser);
    res.cookie('token', token);

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during registration.");
  }
};

module.exports.loginUser = async function (req,res) {
  let {email, password} = req.body;

  let user = await User.findOne({email:email});
  if(!user) {
    //  req.flash("error","email or password is not correct")
     res.redirect("/");
  }
  else{
  bcrypt.compare(password , user.password , function(err,result){
    if(err){
      return res.status(500).send("An Error occured during login");
    }
    if(result){
      let token = generateToken(user);
      res.cookie("token",token,{httpOnly:true});
      req.user = user;
      res.redirect("/dashboard");
    }
    else{
      //  req.flash("error", "email or password incorrect");
       res.redirect("/")
    }
  })
}
}

module.exports.logoutUser = function(req,res){
  res.cookie("token","");
  res.redirect("/");
}

module.exports.updateUserData =async (req, res) => {
  try {
    const { email, name, phone, medicalHistory } = req.body;
    
    // Manually create the address object from the separate fields
    const address = {
      street: req.body['address.street'],
      city: req.body['address.city'],
      state: req.body['address.state'],
      zip: req.body['address.zip'],
      country: req.body['address.country']
    };

    // Check if address has all required fields
    if (!address.street || !address.city || !address.state || !address.zip || !address.country) {
      return res.status(400).json({ message: "Address is missing required fields" });
    }

    // Construct the updated user object
    const updatedUser = {
      name,
      phone,
      address, // Use the address object we just built
      medicalHistory,  // Optional: if you want to update medicalHistory
    };

    // Use findOneAndUpdate to update the user by email
    const user = await User.findOneAndUpdate(
      { email },  // Search condition
      { $set: updatedUser },  // Fields to update
      { new: true, runValidators: true }  // new: true returns the updated document, runValidators: ensures validation runs
    );

    // Check if the user was found and updated
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error while updating user:", error);  // Detailed error logging

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.resetPassword = async function (req, res) {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
