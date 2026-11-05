const mongoose = require("mongoose"); //medicineschema

const MedicineSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true 
  },
  prescriptionRequired: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true });


module.exports = mongoose.model('Medicine',MedicineSchema);
