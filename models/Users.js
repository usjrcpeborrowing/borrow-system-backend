const mongoose = require("mongoose");
const enums = require('./../shared/enum');
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
    enum: enums.roles,
    required: true,
  },
  department: {
    enum: enums.departments,
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
  activated: {
    type: Boolean,
    default: false
  },

  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", userSchema);
