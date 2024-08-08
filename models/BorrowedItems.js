const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "equipment",
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  condition: {
    type: String,
    enum: ["functional", "defective", "obsolete", "lost"],
    default: "functional",
  },
  status: {
    type: String,
    enum: [
      "approved",
      "rejected",
      "released",
      "unreturned",
      "pending_approval",
      "pending_return",
      "returned",
    ],
    default: "pending_approval",
    required: true,
  },
  remarks: {
    type: String,
    default: ""
  }
});

const borrowedItemsSchema = mongoose.Schema({
  itemborrowed: {
    type: [itemSchema],
    default: [],
    // default: () => {return null;},
  },
  dateborrowed: {
    type: Date,
    required: true,
    default: Date.now,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  className: {
    type: String,
    require: true,
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("borrowed_items", borrowedItemsSchema);
