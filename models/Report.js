const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  downloadedBy: {
    type: String,
  },
  role: {
    type: String,
  },
  department: {
    type: String,
  },
  location: {
    type: String,
  },
  selectedFilter: {
    type: String,
  },
  fileName: {
    type: String,
  },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("report", reportSchema);
