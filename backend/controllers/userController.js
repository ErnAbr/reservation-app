const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const AdminReg = require("../models/adminReg.model");

router.post("/register", async (req, res) => {
  try {
    const existingAdmin = await AdminReg.findOne({ email: req.body.email });

    if (!emailValidator.validate(req.body.email)) {
      return res.status(400).send({ message: "Invalid email address" });
    }
    if (existingAdmin) {
      return res.status(409).send({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new AdminReg({
      ...req.body,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(200).send({ message: "Admin has been created" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const admin = await AdminReg.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(401).send({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(req.body.password, admin.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const payload = {
      isAdmin: admin.isAdmin,
    };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    res.status(200).send({
      message: "Successfully logged in",
      isAdmin: admin.isAdmin,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.cookies && req.cookies.token) {
    res.clearCookie("token");
    res.status(200).send({ message: "Successfully logged out" });
  } else {
    res.status(200).send({ message: "You are already logged out" });
  }
});

module.exports = router;
