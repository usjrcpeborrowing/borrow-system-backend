const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  transactionType: {
    type: String,
  },
  user: {
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
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  equipmentId: {
    type: mongoose.Types.ObjectId,
    ref: "equipment",
    required: true,
  },
  revision: {
    type: [
      {
        field: {
          type: String,
          required: true
        },
        oldValue: {
          type: String,
          required: true
        },
        newValue: {
          type: String,
          required: true
        },
      },
    ],
    default: [],
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
