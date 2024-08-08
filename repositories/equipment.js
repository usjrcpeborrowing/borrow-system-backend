const Equipment = require("../models/Equipment");

const createEquipment = async (equipment) => {
  try {
    console.log({equipment})
    let result = await Equipmesnt.create({
      serialNo: equipment.serialNo?.trim(),
      equipmentType: equipment.equipmentType,
      name: toProperCase(equipment.name),
      brand: equipment.brand,
      color: equipment.color,
      modelNo: toProperCase(equipment.modelNo),
      quantity: toProperCase(equipment.quantity),
      unit: equipment.unit?.toLowerCase(),
      condition: equipment.condition,
      status: equipment.status,
      location: toProperCase(equipment.location),
      department: equipment.department,
      inventorytype: equipment.inventorytype,
      inventorytag: equipment.inventorytag,
    });
    console.log("new equipment created with id:", result._id);
  } catch (err) {
    console.log("errr", err.message);
    throw new Error(err.message);
  }
};

const updateEquipmentAvailability = async (equipmentIds) => {
  let query = { _id: { $in: equipmentIds } };
  return await Equipment.updateMany(query, { $set: { availability: "borrowed" } }, { runValidators: true });
};

const getEquipmentByQuery = async (query, limit, page) => {
  return await Promise.all([
    Equipment.find(query)
      .limit(limit)
      .skip(limit * (page - 1))
      .lean(),
    Equipment.find(query).count(),
  ]);
};

function toProperCase(str) {
  console.log(str)
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

module.exports = {
  updateEquipmentAvailability,
  getEquipmentByQuery,
  createEquipment,
};
