const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();

const verifyPermission = (req, res, next) => {
  // exclude login path

  console.log("this is verify permission", req.user);
  next();
};

module.exports = verifyPermission;
