import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
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
export const Actuator = mongoose.model("Actuator", schema);
