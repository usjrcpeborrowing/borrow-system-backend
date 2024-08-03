const mongoose = require("mongoose");
const enums = require("./../shared/enum");
const EquipmentSchema = mongoose.Schema({
  serialNo: {
    type: String,
  },
  equipmentType: {
    type: mongoose.Schema.Types.String,
  },
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  modelNo: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  unit: {
    type: String,
  },
  matter: {
    type: String,
    enum: ["solid", "liquid", "gas"],
    default: "solid",
  },
  description: {
    type: String,
  },
  condition: {
    type: String,
    enum: ["functional", "defective", "obsolete", "lost", "turned_over"],
    dafault: "functional",
  },
  dateAcquired: {
    type: Date,
    required: true,
    default: Date.now,
  },
  images: {
    thumbnailUrl: String,
    midSizeUrl: String,
    Url: String,
  },
  remarks: {
    type: String,
  },
  inventorytag: {
    type: Boolean,
  },
  checkedBy: {
    type: String,
  },
  department: {
    type: String,
    enum: enums.departments,
    required: true,
  },
  availability: {
    type: String,
    enum: ["available", "borrowed", "unreturned "],
    default: "available",
    required: true,
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("equipment", EquipmentSchema);
