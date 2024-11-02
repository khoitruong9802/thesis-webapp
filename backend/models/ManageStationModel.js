import mongoose from "mongoose";

const schema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ManageStation",
    required: true
  }
})

export const ManageStation = mongoose.model("ManageStation", schema);