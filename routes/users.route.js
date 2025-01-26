const express = require("express");
const router = express.Router();

const User = require("../models/user.model.js");

const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserData,
  resetPassword,
} = require("../controllers/auth.controller.js");

const {
  sendmailforotp,
  verifyotp,
} = require("../middlewares/mail.middeleware.js");


router.post("/auth/login", loginUser);
router.get("/logout", logoutUser);
router.post("/details", updateUserData);

router.get("/register", (req, res) => res.render("register"));
router.post("/register/send-otp",(req, res, next) => {
    req.query.redirectTo = "/users/register/verifyotp";
    next();
  },
  sendmailforotp
);
router.post("/register/verify-otp", verifyotp, registerUser);
router.get("/register/verifyotp", (req, res) => {
  const { email } = req.query;
  res.render("verifyotp", { email, actionUrl: "/users/register/verify-otp" });
});



router.get("/forgot-password", (req, res) => res.render("forgot-password"));
router.post("/forgot-password/send-otp",(req, res, next) => {
    req.query.redirectTo = "/users/forgot-password/verifyotp"; 
    next();
  },
  sendmailforotp
);
router.post("/forgot-password/verify-otp", verifyotp, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("No user found with this email.");
  }
  res.render("reset-password", { email });
});
router.post("/forgot-password/reset-password", resetPassword);
router.get("/forgot-password/verifyotp", (req, res) => {
  const { email } = req.query;
  res.render("verifyotp", {
    email,
    actionUrl: "/users/forgot-password/verify-otp",
  });
});


module.exports = router;
