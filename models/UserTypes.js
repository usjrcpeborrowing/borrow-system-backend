const mongoose = require("mongoose");

const userTypesSchema = mongoose.Schema({
  role: {
    type: String,
  },
  disp: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = mongoose.model("userTypes", userTypesSchema);
