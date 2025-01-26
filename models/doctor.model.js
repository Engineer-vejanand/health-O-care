const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  specialization: { 
    type: String, 
    required: true 
  },
  qualifications: { 
    type: [String], 
    required: true 
  },
  experience: { 
    type: Number, 
    required: true 
  },
  availability: [{
    day: { 
      type: String, 
      required: true 
    }, 
    startTime: { 
      type: String, 
      required: true 
    },
    endTime: { 
      type: String, 
      required: true 
    },
  }],
  ratings: { 
    type: [Number], 
    default: [] 
  },
}, { timestamps: true });

module.exports=mongoose.model('Doctor',DoctorSchema);