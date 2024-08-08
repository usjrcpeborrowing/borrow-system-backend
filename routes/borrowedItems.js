const express = require("express");
const router = express.Router();
const BorrowedItems = require("../models/BorrowedItems");
const borrowedItemsRepository = require("../repositories/borrowedItems");

const notificationRepository = require("../repositories/notification");
const equipmentRepository = require("../repositories/equipment");

router.get("/", async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let status = req.query.status;
    let instructor = req.query.instructor;

    let populateQuery = [
      { path: "borrower", select: "schoolId firstName lastName department" },
      {
        path: "itemborrowed.equipment",
        select: "name brand remarks",
      },
      {
        path: "instructor",
        select: "schoolId firstName lastName department",
      },
    ];

    let query = { dis: true };

    if (instructor) query.instructor = instructor;
    if (status) query.status = status;

    let [borrowedItems, total] = await Promise.all([
      borrowedItemsRepository.findBorrowedItemsByQuery(query, populateQuery, limit, page),
      BorrowedItems.find(query).count(),
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
    const socketId = req?.userSockets[data.instructor];
    let equipmentIds = req.body.itemborrowed.map((x) => x.equipment);
    let message = `New Borrow Request from class ${data.className}`;

    await BorrowedItems.create(data);
    // await notificationRepository.createNotification(
    //   message,
    //   data.instructor,
    //   "borrow"
    // );

    // await equipmentRepository.updateEquipmentAvailability(equipmentIds);
    req.io.to(socketId).emit("notification", message);

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
    let items = req.body.items;
    console.log("iteeeems", items);
    let itemIds = req.body.items.map((x) => x.equipment);
    let status = req.body.status;
    let result = await borrowedItemsRepository.updateEquipmentStatus(id, items, status);
    console.log(result);
    res.json({
      data: result,
      message: "success updating borrowed items",
      success: true,
    });
  } catch (err) {
    console.error(err.message);
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
