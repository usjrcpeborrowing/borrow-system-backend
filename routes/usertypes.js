const express = require("express");
const UserTypes = require("../models/UserTypes");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        let [usertypes, total] = await Promise.all([
            UserTypes.find()
              .limit(limit * 1)
              .skip((page - 1) * limit),
              UserTypes.find({ dis: true }).count(),
          ]);

        res.json({ 
            data: usertypes, 
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
        await UserTypes.create(data);
        res.json({ message: "success added", success: true });
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        let data = req.body;
        let id = req.params.id;
        await UserTypes.findByIdAndUpdate(id, data);
        res.json({
        data: data,
        message: "success update user type",
        success: true,
        });
    } catch (err) {
        res.json({ data: null, message: err.message, success: false });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      let id = req.params.id;
      await UserTypes.findByIdAndUpdate(id, { dis: false });
      res.json({ data: null, message: "success remove", success: true });
    } catch (err) {
      res.json({ data: null, message: err.message, success: false });
    }
});

module.exports = router;