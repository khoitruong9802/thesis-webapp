import mongoose from "mongoose";

const schema = new mongoose.Schema({
  scheduleName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  stopTime: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  flow1: {
    type: Number,
    required: true
  },
  flow2: {
    type: Number,
    required: true
  },
  flow3: {
    type: Number,
    required: true
  },
  cycle: {
    type: Number,
    required: true
  },
  everyday: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: false
  },
  station: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Station", 
    required: true 
  }
})

export const Schedule = mongoose.model("Schedule", schema);