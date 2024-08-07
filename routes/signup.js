const express = require("express");
const router = express.Router();
const userRepository = require("../repositories/users");

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    console.log({ schoolId: data.schoolId });
    let user = await userRepository.findUserBySchoolId(data.schoolId);
    console.log(user);
    if (user) throw new Error("schoolId already exists");
    await userRepository.createUser(data);
    res.json({ message: "Account registered. Wait for the chairman for activation", success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

module.exports = router;
