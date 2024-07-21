const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json({
      data: null,
      message: "success get notification",
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
