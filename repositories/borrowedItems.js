const BorrowedItems = require("../models/BorrowedItems");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const getInventoryReportById = async (id) => {
  return await BorrowedItems.findById(id);
};

const updateEquipmentStatus = async (id, equipmentIds, status) => {
  return await BorrowedItems.updateMany(
    {
      _id: id,
    },
    {
      $set: {
        "itemborrowed.$[elem].status": status,
      },
    },
    {
      arrayFilters: [{ "elem.equipment": { $in: equipmentIds } }],
    }
  );
};

module.exports = { updateEquipmentStatus };
