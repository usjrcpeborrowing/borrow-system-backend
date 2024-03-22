const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  dis: {
    type: Boolean,
    default: true,
  },
  
});

module.exports = mongoose.model("department", departmentSchema);
