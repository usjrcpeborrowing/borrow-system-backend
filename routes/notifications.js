const express = require("express");
const mongoose = require("mongoose");
const notificationRepository = require("./../repositories/notification");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { user, limit = 10 } = req.query;
    let query = {};
    if (user) query.user = user;
    console.log(query);
    let result = await notificationRepository.getNotification(query, limit);
    res.status(200).json({
      data: result,
      message: "success get notification",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: err.message,
      success: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    res.json({
      data: null,
      message: "success creating notification",
      success: true,
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.mesage,
      success: false,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    res.json({
      data: null,
      message: "success updating notification",
      success: true,
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.mesage,
      success: false,
    });
  }
});

module.exports = router;
