const jwt = require("jsonwebtoken");
const express = require("express");
const { findUserBySchoolIdAndPassword } = require("../repositories/users");
require("dotenv").config();
const router = express.Router();

router.post("/", async (req, res) => {
  // ...
  try {
    let { schoolId, password } = req.body;
    let user = await findUserBySchoolIdAndPassword(schoolId, password);
    if (!user) throw new Error("Login failed");

    delete user.password;
    const token = generateAccessToken(schoolId);
    res.json({
      data: user,
      token,
      message: "success user login",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

function generateAccessToken(schoolId) {
  return jwt.sign({ schoolId }, process.env.JWT_SECRETKEY, {
    expiresIn: "10d",
  });
}

module.exports = router;
