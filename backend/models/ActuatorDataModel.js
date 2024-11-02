import mongoose from "mongoose";

const schema = new mongoose.Schema({
  status: {
    type: Number,
    required: true
  },
  actuator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Actuator", 
    required: true 
  }
}, {
  timestamps: true
});
export const Actuator = mongoose.model("ActuatorData", schema);
