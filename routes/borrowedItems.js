const express = require("express");
const router = express.Router();
const BorrowedItems = require("../models/BorrowedItems");
const { updateEquipmentStatus } = require("../repositories/borrowedItems");

router.get("/", async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;

    let populateQuery = [
      { path: "borrower", select: "schoolId firstName lastName" },
      {
        path: "itemborrowed.equipment",
        select: "name brand remarks",
      },
    ];

    let [borrowedItems, total] = await Promise.all([
      BorrowedItems.find({ dis: true })
        .populate(populateQuery)
        .limit(limit)
        .skip(limit * (page - 1)),
      BorrowedItems.find({ dis: true }).count(),
    ]);

    res.json({
      data: borrowedItems,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    await BorrowedItems.create(data);

    res.json({ data: null, message: "success register", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let itemReturnedIds = req.body.itemreturned.map((x) => x.equipment);
    let status = req.body.status;
    let result = await updateEquipmentStatus(id, itemReturnedIds, status);
    res.json({ data: result, message: "success patch", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await BorrowedItems.findByIdAndUpdate(id, { dis: false });
    res.json({ data: null, message: "success remove", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

module.exports = router;
