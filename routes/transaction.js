const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    let { page = 1, limit = 10, equipmentId = [] } = req.query;
    let query = { dis: true };
    equipmentId = Array.isArray(equipmentId) ? equipmentId : [equipmentId];
    if (equipmentId.length) query.equipmentId = { $in: equipmentId.map((id) => new ObjectId(id)) };

    console.log(query);
    let aggregateQuery = [
      {
        $match: query,
      },
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
              transactionType: "$transactionType",
              timeStamp: "$timeStamp"
            },
          },
        },
      },
    ];

    let transactions = await Transaction.aggregate(aggregateQuery);

    res.json({
      data: transactions,
      total: transactions.length,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
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
