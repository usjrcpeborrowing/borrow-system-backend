const express = require("express");
const Users = require("../models/Users");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        let [users, total] = await Promise.all([
            Users.find()
              .limit(limit * 1)
              .skip((page - 1) * limit),
              Users.find({ dis: true }).count(),
          ]);

        res.json({ 
            data: users, 
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
        await Users.create(data);
        res.json({ message: "success added", success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        let data = req.body;
        let id = req.params.id;
        await Users.findByIdAndUpdate(id, data);
        res.json({
        data: data,
        message: "success update user",
        success: true,
        });
    } catch (err) {
        res.json({ data: null, message: err.message, success: false });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      await Users.findByIdAndUpdate(id, { dis: false });
      res.json({ data: null, message: "success remove", success: true });
    } catch (err) {
      res.json({ data: null, message: err.message, success: false });
    }
});

module.exports = router;