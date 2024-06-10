const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    let aggregateQuery = [
      // {
      //   $match: {
      //     equipmentId: {
      //       $in: [new ObjectId("65e7f87df162d1a6883ffad5")],
      //     },
      //   },
      // },
      {
        $group: {
          _id: "$equipmentId",
          data: {
            $push: {
              _id: "$_id",
              revision: "$revision",
              location: "$location",
              role: "$role",
              user: "$user",
            },
          },
        },
      },
    ];

    let [transactions, total] = await Promise.all([
      Transaction.find()
        .limit(limit * 1)
        .skip((page - 1) * limit),
      Transaction.find({ dis: true }).count(),
    ]);

    res.json({
      data: transactions,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ success: false });
  }
});

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    await Transaction.create(data);
    res.json({ message: "transation added successfully", success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    await Transaction.findByIdAndUpdate(id, data);
    res.json({
      data: data,
      message: "success update department",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Transaction.findByIdAndUpdate(id, { dis: false });
    res.json({ data: null, message: "success remove", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

module.exports = router;
