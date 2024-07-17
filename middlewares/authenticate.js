const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // exclude login path
  if (req.path == "/api/login") {
    console.log("this is login");
    next();
  }

  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    console.log("no authheader");
    return res.status(401).json({ message: "No Auth Header" });
  }

  jwt.verify(authHeader, process.env.JWT_SECRETKEY, (err, user) => {

    if (err) return res.status(403).json({ message: err.message });

    req.user = user;

    next();
    // res.json({ user, success: true, message: "nuice" });
  });
};

module.exports = authenticateToken;
