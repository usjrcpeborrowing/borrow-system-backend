const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: [String],
    enum: ["student", "reads", "oic", "faculty", "chairman", "administrator"],
    required: true,
  },
  department: {
    enum: ["CPE"],
    type: [String],
    required: true
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("users", userSchema);
