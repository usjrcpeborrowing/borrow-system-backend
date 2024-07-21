const express = require("express");
const router = express.Router();
const BorrowedItems = require("../models/BorrowedItems");
const {
  updateEquipmentStatus,
  findEquipmentByQuery,
} = require("../repositories/borrowedItems");

router.get("/", async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let status = req.query.status;
    let instructor = req.query.instructor;

    let populateQuery = [
      { path: "borrower", select: "schoolId firstName lastName" },
      {
        path: "itemborrowed.equipment",
        select: "name brand remarks",
      },
    ];

    let query = {
      status,
      dis: true,
    };

    let [borrowedItems, total] = await Promise.all([
      findEquipmentByQuery(query, populateQuery, limit, page),
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
    const socketId = req?.userSockets[data.instructor];
    req.io.to(socketId).emit("notification", "New Borrow Request");
    res.json({
      data: null,
      message: "Success requesting borrow equipments",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    
    let itemIds = req.body.items.map((x) => x.equipment);
    let status = req.body.status;
    let result = await updateEquipmentStatus(id, itemIds, status);
    res.json({ data: result, message: "success updating borrowed items", success: true });
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
