import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  station: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Station", 
    required: true 
  }
});
export const Sensor = mongoose.model("Sensor", schema);
