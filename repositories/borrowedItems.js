const BorrowedItems = require("../models/BorrowedItems");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getInventoryReportById = async (id) => {
  return await BorrowedItems.findById(id);
};

const updateEquipmentStatus = async (id, equipments, status) => {
  console.log(equipments);
  let updateOperations = equipments
    .map((update, index) => {
      return {
        [`itemborrowed.$[elem${index}].quantity`]: update.quantity,
        [`itemborrowed.$[elem${index}].condition`]: update.condition,
        [`itemborrowed.$[elem${index}].status`]: status,
        [`itemborrowed.$[elem${index}].remarks`]: update.remarks,
      };
    })
    .reduce((acc, curr) => Object.assign(acc, curr), {});

  let arrayFilters = equipments.map((update, index) => {
    return { [`elem${index}.equipment`]: update.equipment };
  });
  console.log(arrayFilters);
  console.log(updateOperations);

  return await BorrowedItems.updateMany({ _id: id }, { $set: updateOperations }, { arrayFilters: arrayFilters });
};

const findBorrowedItemsByQuery = async (query, populateQuery, limit, page) => {
  return BorrowedItems.find(query)
    .populate(populateQuery)
    .limit(limit)
    .skip(limit * (page - 1));
};

const getBorrowedItemsByEquipmentIds = async (equipmentIds, limit, page, populateQuery) => {
  let query = { "itemborrowed.equipment": { $in: equipmentIds }, "itemborrowed.status": { $ne: "returned" } };
  return BorrowedItems.find(query).lean();
};

module.exports = { updateEquipmentStatus, findBorrowedItemsByQuery, getBorrowedItemsByEquipmentIds };
