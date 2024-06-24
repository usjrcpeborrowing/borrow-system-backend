const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: [String],
    enum: ["student", "reads", "oic", "faculty", "chairman", "administrator"],
    required: true,
  },
  department: {
    enum: ["CPE"],
    type: [String],
    required: true,
  },
  schoolId: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("users", userSchema);
