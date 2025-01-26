const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: { 
    type: String, 
    required: true
   },
  city: { 
    type: String, 
    required: true
   },
  state: { 
    type: String, 
    required: true 
  },
  zip: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },
  address: AddressSchema,
  medicalHistory: { 
    type: [String] 
  }, 
  
},{ timestamps: true });

module.exports = mongoose.model('User',UserSchema)

