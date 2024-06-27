const express = require("express");
const InventoryReport = require("../models/InventoryReport");
const userRepository = require("../repositories/users");
const inventoryRepository = require("../repositories/inventoryReport");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let populateQuery = [
      { path: "approval.approveBy", select: "firstName lastName" },
      { path: "issuedBy", select: "firstName lastName" },
    ];
    let result = await InventoryReport.findOne({}).populate(populateQuery);
    res.json({
      data: result,
      message: "success",
      sucess: true,
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      sucess: false,
    });
  }
});

router.get("/getbydepartment", async (req, res) => {
  try {
    res.json({
      data: null,
      message: "success",
      sucess: true,
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      sucess: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    console.table(data);
    let [oic, chairman, administrator] = await Promise.all([
      userRepository.getOIC(data.department),
      userRepository.getChairman(data.department),
      userRepository.getAdministrator(),
    ]);
    // console.log({ oic, chairman, administrator });

    let inventory_report = {
      schoolYear: data.schoolYear,
      semester: data.semester,
      department: data.department,
      issuedBy: data.issuedBy,
      approval: [
        {
          status: "pending",
          approveBy: oic._id,
          role: "oic",
        },
        {
          status: "pending",
          approveBy: chairman._id,
          role: "chairman",
        },
        {
          status: "pending",
          approveBy: administrator._id,
          role: "administrator",
        },
      ],
    };
    await InventoryReport.create(inventory_report);
    res.json({ message: "success added", success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { role, status } = req.body;
    let inventoryreport = await inventoryRepository.getInventoryReportById(id);

    if (!inventoryreport) throw new Error("No Inventory Report Found");

    let approval = inventoryreport.approval;
    let index = approval.findIndex((appr) => appr.role == role);
    approval[index].status = status;
    console.log(approval);
    let result = await InventoryReport.findByIdAndUpdate(id, { approval });
    res.json({
      data: inventoryreport,
      message: "success updating inventory report",
      success: true,
    });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});
module.exports = router;
