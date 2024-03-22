const express = require("express");
const Department = require("../models/Department");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        let [departments, total] = await Promise.all([
            Department.find()
              .limit(limit * 1)
              .skip((page - 1) * limit),
              Department.find({ dis: true }).count(),
          ]);

        res.json({ 
            data: departments, 
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
        await Department.create(data);
        res.json({ message: "success added", success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        let data = req.body;
        let id = req.params.id;
        await Department.findByIdAndUpdate(id, data);
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
      await Department.findByIdAndUpdate(id, { dis: false });
      res.json({ data: null, message: "success remove", success: true });
    } catch (err) {
      res.json({ data: null, message: err.message, success: false });
    }
  });

module.exports = router;