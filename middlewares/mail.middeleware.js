const nodemailer = require("nodemailer"); // for reciving mails
const otpGenerator = require("otp-generator");

const User = require("../models/user.model.js");
require("dotenv").config();


const temporaryStorage = require("../utils/temporaryStorage.js")
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.APP_PASS,
  },
});

const sendmailforotp = async (req, res) => {
  const { email , password , name , role ,specialization, qualifications, experience, availability } = req.body;

  const { redirectTo } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    alphabets: false,
    specialChars: false,
    digits: true,
  });

  temporaryStorage[email] = { otp,password,name,role, specialization, qualifications, experience, availability, expiresAt: Date.now() + 300000 };

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send OTP" });
    }
    res.redirect(`${redirectTo}?email=${encodeURIComponent(email)}`);
  });
};

const verifyotp = (req, res,next) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP are required" });

  const storedData = temporaryStorage[email];


  if (
    !storedData ||
    storedData.otp !== otp ||
    storedData.expiresAt < Date.now()
  ) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  req.body.password = storedData.password;
  req.body.name = storedData.name;
  req.body.role = storedData.role;
  req.body.specialization = storedData.specialization;
  req.body.qualifications = storedData.qualifications;
  req.body.experience = storedData.experience;
  req.body.availability = storedData.availability;

  delete temporaryStorage[email];
  next();
};

module.exports = {
  sendmailforotp,
  verifyotp,
};
