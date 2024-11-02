import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  deviceCode: {
    type: String,
    required: true
  }
})

export const FertilizerDevice = mongoose.model("FertilizerDevice", schema);