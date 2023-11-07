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

router.get("/get-booked-slots/:date", isAdmin, async (req, res) => {
  try {
    const selectedDate = req.params.date;
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(2, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const matchStage = {
      $match: {
        registrationDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    };

    const groupStage = {
      $group: {
        _id: {
          year: { $year: "$registrationDate" },
          month: { $month: "$registrationDate" },
          day: { $dayOfMonth: "$registrationDate" },
          hour: { $hour: "$registrationDate" },
          minute: { $minute: "$registrationDate" },
        },
        count: { $sum: 1 },
      },
    };

    const filterCountStage = {
      $match: {
        count: { $gte: 2 },
      },
    };

    const projectStage = {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.day",
        hour: "$_id.hour",
        minute: "$_id.minute",
      },
    };

    const bookedSlots = await Client.aggregate([
      matchStage,
      groupStage,
      filterCountStage,
      projectStage,
    ]);

    return res.status(200).send({ bookedSlots });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", isAdmin, async (req, res) => {
  try {
    const dateString = req.query.date;
    if (!dateString) {
      return res.status(400).send({ message: "No date provided" });
    }

    const date = new Date(dateString);
    const endOfDay = new Date(date);
    date.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(24, 0, 0, 0);

    const records = await Client.find({
      registrationDate: {
        $gte: date,
        $lt: endOfDay,
      },
    });

    return res
      .status(200)
      .send({ message: "Records have been fetched", result: records });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/", isAdmin, async (req, res) => {
  try {
    const deleteReservation = await Client.findOneAndDelete({
      _id: req.query.id,
    });

    if (!deleteReservation) {
      return res.status(404).send({ message: "Reservation not found" });
    }

    return res.status(200).send({ message: "Reservation has Been Deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
