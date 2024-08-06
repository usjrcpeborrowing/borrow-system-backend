const Equipment = require("../models/Equipment");

const updateEquipmentAvailability = async (equipmentIds) => {
  let query = { _id: { $in: equipmentIds } };
  return await Equipment.updateMany(query, { $set: { availability: "borrowed" } }, { runValidators: true });
};

const getEquipmentByQuery = async (query, limit, page) => {
  return await Promise.all([
    Equipment.find(query)
      .limit(limit)
      .skip(limit * (page - 1)).lean(),
    Equipment.find(query).count(),
  ]);
};

module.exports = {
  updateEquipmentAvailability,
  getEquipmentByQuery,
};
