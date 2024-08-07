const mongoose = require("mongoose");
const enums = require("./../shared/enum");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
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
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  department: {
    type: [String],
    enum: enums.departments,
    validate: (v) => Array.isArray(v) && v.length > 0,
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
    default: false,
  },

  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", userSchema);
