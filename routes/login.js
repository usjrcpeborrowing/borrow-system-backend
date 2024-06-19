const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  // ...
  console.log(req.body)
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);

  // ...
});

function generateAccessToken(username) {
  return jwt.sign({ username }, "wahahhalol", { expiresIn: "2h" });
}

module.exports = router;
