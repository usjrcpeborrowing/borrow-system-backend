const BorrowedItems = require("../models/BorrowedItems");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const getInventoryReportById = async (id) => {
  return await BorrowedItems.findById(id);
};

const updateEquipmentStatus = async () => {
  return await BorrowedItems.updateMany(
    {
      _id: "6688fadf101d387313b261fc",
      "itemborrowed.equipment": {
        $in: ["65e7f9abf162d1a6883ffb47"],
      },
    },
    {
      $set: {
        "itemborrowed.$.status": "available",
      },
    },
    
  );
};

module.exports = { updateEquipmentStatus };
