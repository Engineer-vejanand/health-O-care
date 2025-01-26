const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    medicines: [{
      medicine: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medicine', 
        required: true 
      },
    quantity: { 
        type: Number, 
        required: true 
      },
    }],
    totalAmount: { 
      type: Number,
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
      default: 'pending' 
    },
  }, { timestamps: true });

module.exports=mongoose.model('Order',OrderSchema);