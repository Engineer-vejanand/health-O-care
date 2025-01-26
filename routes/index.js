const express = require("express");
const router = express.Router();

const isLoggedin = require("../middlewares/isLoggedin.middeleware.js")
const Medicine = require("../models/medicine.model.js")


router.get("/",(req,res)=>{
    res.render("home");
});
router.get("/register",(req,res)=>{
    res.render("register");
});
router.get("/login",(req,res)=>{
    res.render("loginchatgpt");
});

router.get("/dashboard",isLoggedin,(req,res)=>{
    res.render("dashaboard",{user:req.user});
});
router.get("/userdetails",isLoggedin,(req,res)=>{
    res.render("userdetails");
});

router.get("/add-medicine", (req, res) => {
    res.render("addMedicine");
  });
router.post("/add-medicine", async (req, res) => {
    try {
      const { name, brand, description, price, stock, prescriptionRequired } = req.body;
      const newMedicine = new Medicine({ 
        name, 
        brand, 
        description, 
        price: parseFloat(price), 
        stock: parseInt(stock), 
        prescriptionRequired: prescriptionRequired === 'on' 
      });
      await newMedicine.save();
      res.redirect("/medicine");
    } catch (error) {
      console.error("Error adding medicine:", error);
      res.status(500).send("Error adding medicine");
    }
  });
  
router.get("/medicine", async (req, res) => {
    try {
      const medicines = await Medicine.find(); // Fetch all medicines
      res.render("medicine", { medicines });
    } catch (error) {
      res.status(500).send("Error fetching medicines");
    }
  });


module.exports = router;