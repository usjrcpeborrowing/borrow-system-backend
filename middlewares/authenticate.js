const jwt = require("jsonwebtoken");
const express = require("express");

const authenticateToken = (req, res, next) => {
  // exclude login path
  if (req.path == "/api/login") {
    console.log("this is login");
    next();
  }

  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    console.log("no authheader");
    return res.sendStatus(401);
  }

  jwt.verify(authHeader, "wahahhalol", (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
    // res.json({ user, success: true, message: "nuice" });
  });
};

module.exports = authenticateToken;
