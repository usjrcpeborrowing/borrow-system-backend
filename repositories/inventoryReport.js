const InventoryReport = require("../models/InventoryReport");

const getInventoryReportById = async (id) => {
  return await InventoryReport.findById(id);
};

module.exports = { getInventoryReportById };
