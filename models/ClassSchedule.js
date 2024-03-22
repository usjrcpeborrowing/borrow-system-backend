// const { time } = require("console");
const mongoose = require("mongoose");

const classScheduleSchema = mongoose.Schema({
  offercode: {
    type: String,
  },
  subjectcode: {
    type: String,
  },
  name: {
    type: String,
  },
  days: {
    type: String,
  },
  time: {
    start: {
      type: String,
    },
    end: {
      type: String,
    }
  },
  room: {
    type: String,
  },
  campus: {
    type: String,
  },
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  students: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  dis: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = mongoose.model("class_schedule", classScheduleSchema);
