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
    enum: enums.equipment_condition,
    dafault: "functional",
  },
  status: {
    type: String,
    enum: enums.equipment_status,
    dafault: "acquired",
  },
  dateAcquired: {
    type: Date,
    required: true,
    default: Date.now,
  },
  images: {
    thumbnailUrl: {
      type: String,
      default: "",
    },
    midSizeUrl: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
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
    type: [String],
    enum: enums.departments,
    required: true,
  },
  availability: {
    type: String,
    enum: enums.equipment_availability,
    default: "available",
    required: true,
  },
  inventorytype: {
    type: String,
    enum: ["inventory", "non_inventory"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isborrow: {
    type: Boolean,
    default: true,
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("equipment", EquipmentSchema);
