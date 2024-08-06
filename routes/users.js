const express = require("express");
const Users = require("../models/Users");
const userRepository = require("../repositories/users");
const verifyPermission = require("../middlewares/verifyPermission");
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
    console.log({ schoolId: data.schoolId });
    let user = await userRepository.findUserBySchoolId(data.schoolId);
    console.log(user);
    if (user) throw new Error("schoolId already exists");
    await userRepository.createUser(data);
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

router.get("/getdepartmentchair", async (req, res) => {
  try {
    let department = req.query.department;
    let result = await userRepository.getChairman(department);
    res.json({ data: result, message: "success getting oic", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getdepartmentoic", async (req, res) => {
  try {
    let department = req.query.department;
    let result = await userRepository.getOIC(department);
    res.json({ data: result, message: "success getting oic", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getadministrator", async (req, res) => {
  try {
    let result = await userRepository.getAdministrator();
    res.json({
      data: result,
      message: "success getting admistrator",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getdepartmentfaculty", async (req, res) => {
  try {
    let { department = [], search = "" } = req.query;
    department = Array.isArray(department) ? department : [department];
    console.log({ department, search });
    let result = await userRepository.getFacultyUsersByDepartment(
      department,
      search
    );
    res.json({
      data: result,
      message: "success getting faculty by department",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.patch("/activateuser/:id", verifyPermission, async (req, res) => {
  try {
    console.log("active user");
    res.json({
      data: null,
      message: "success getting faculty by department",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});
module.exports = router;
