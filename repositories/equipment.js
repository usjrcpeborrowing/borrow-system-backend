const BorrowedItems = require("../models/Equipment");

const updateEquipmentAvailability = async (equipmentIds) => {
  let query = { _id: { $in: equipmentIds } };
  return await Equipment.updateMany(
    query,
    { $set: { availability: "borroweds" } },
    { runValidators: true }
  );
};

module.exports = {
    updateEquipmentAvailability
}
