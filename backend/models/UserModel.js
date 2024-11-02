import mongoose from "mongoose";

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export const User = mongoose.model("User", schema);