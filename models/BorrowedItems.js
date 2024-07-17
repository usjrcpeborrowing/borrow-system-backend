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
    default: "good",
  },
  status: {
    type: String,
    enum: ["available", "released", "unreturned", "pending"],
    default: "pending",
    required: true,
  },
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
    required: true,
    ref: "users",
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  className: {
    type: String,
    require: true
  },
  instructor: {
    type: String,
  },
  dis: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("borrowed_items", borrowedItemsSchema);
