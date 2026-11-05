const Order = require("../models/order.model.js");  // here also models 
const Medicine = require("../models/medicine.model.js");
const User = require("../models/user.model.js"); 


exports.createOrder = async (req, res) => {
  try {
    const { userId, medicines, quantities, totalAmount } = req.body;

    if (!userId || !medicines || !quantities || !totalAmount) {
      return res.status(400).send("Missing required fields");
    }

    if (medicines.length !== quantities.length) {
      return res.status(400).send("Medicines and quantities do not match");
    }


    const newOrder = new Order({
      user: userId,
      medicines: medicines.map((id, index) => ({
        medicine: id,
        quantity: quantities[index],
      })),
      totalAmount,
      status: "pending",
    });
    

    for (let i = 0; i < medicines.length; i++) {
      const medicineId = medicines[i];
      const quantity = quantities[i];

      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).send(`Medicine with ID ${medicineId} not found`);
      }

      if (medicine.stock < quantity) {
        return res
          .status(400)
          .send(`Insufficient stock for medicine: ${medicine.name}`);
      }

      // Decrease stock
      medicine.stock -= quantity;
      await medicine.save();
    }
   

    await newOrder.save();
    res.redirect("/orders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
};


exports.viewOrders = async (req, res) => {
  try {
    const userId = req.query.userId;
    let orders;

    if (userId) {
      orders = await Order.find({ user: userId }).populate('user').populate('medicines.medicine');
    } else {
      orders = await Order.find().populate('user').populate('medicines.medicine');
    }

    res.render("viewOrders", { orders }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching orders");
  }
};


exports.updateOrderStatusForm = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('medicines.medicine');
    if (!order) return res.status(404).send("Order not found");

    res.render("updateOrderStatus", { order });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching order details");
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    res.redirect("/orders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating order status");
  }
};


exports.deleteOrderForm = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('medicines.medicine');
    if (!order) return res.status(404).send("Order not found");

    res.render("deleteOrder", { order }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching order details");
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send("Order not found");

    res.redirect("/orders"); 
    } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting order");
  }
};
