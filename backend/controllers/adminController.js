const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");
//module.exports.ADMIN_API = "/api/admin";
function isAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    const jwtSecret = process.env.JWT_SECRET;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).send("Forbidden: Not enough privileges");
    }
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token");
  }
}

router.get("/", isAdmin, async (req, res) => {
  try {
    return res.status(200).send({ message: "all good" });
  } catch (error) {
    return res.status(500).send({ message: "check error" });
  }
});

module.exports = router;
