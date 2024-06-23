const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const inventoryReportSchema = mongoose.Schema({
  schoolYear: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    enum: ["1st", "2nd", "summer"],
    required: true,
  },
  department: {
    type: String,
    enum: ["CPE"],
  },
  issuedBy: {
    type: ObjectId,
    ref: "users",
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  approval: {
    type: [
      {
        status: {
          type: String,
          enum: ["pending", "approve", "reject"],
          default: "pending",
        },
        approveBy: {
          type: ObjectId,
          ref: "users",
        },
        role: {
          type: String,
          enum: ["oic", "chairman", "administrator"],
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
});

module.exports = mongoose.model("inventory_report", inventoryReportSchema);
