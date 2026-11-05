const express = require("express");// orders route
const router = express.Router();
const OrderController = require("../controllers/order.controller.js"); // Assuming your controller is in this path

const User = require("../models/user.model.js");
const Order = require("../models/order.model.js")
const Medicine = require("../models/medicine.model.js");

const isLoggedin = require("../middlewares/isLoggedin.middeleware.js")


router.get("/create", isLoggedin, async (req, res) => {
    try {
        
        const medicines = await Medicine.find();  
    
        if (!medicines || medicines.length === 0) {
          return res.status(404).send("No medicines found");
        }
    
        res.render("createorder", { medicines, userId: req.user._id }); 
      }  catch (error) {
      console.error("Error fetching medicines:", error);
      res.status(500).send("Error fetching medicines");
    }
  });
router.post('/create', OrderController.createOrder);
router.get("/", OrderController.viewOrders);

router.get("/update-status/:id", OrderController.updateOrderStatusForm);
router.post("/update-status", OrderController.updateOrderStatus);

router.get("/delete/:id", OrderController.deleteOrderForm); 
router.post("/delete/:id", OrderController.deleteOrder); 

module.exports = router;
