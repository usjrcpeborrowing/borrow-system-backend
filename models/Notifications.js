const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const EquipmentSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["inventory_report", "borrow"],
  },
  message: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: "user",
  },
  viewed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("notification", EquipmentSchema);
