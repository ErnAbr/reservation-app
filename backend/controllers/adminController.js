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
      return res
        .status(401)
        .send({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Forbidden: Not enough privileges" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
}

router.post("/register", isAdmin, async (req, res) => {
  console.log(req.body.registrationDate);
  try {
    const client = new Client(req.body);
    const savedClient = await client.save();
    return res.status(200).send({ message: "Reservation Done" });
  } catch (error) {
    console.error("Error saving client:", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/", isAdmin, async (req, res) => {
  try {
    return res.status(200).send({ message: "all good" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
