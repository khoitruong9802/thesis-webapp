import mongoose from "mongoose";

const schema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },  
  sensor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Sensor", 
    required: true 
  }
}, {
  timestamps: true
});
export const Sensor = mongoose.model("SensorData", schema);
