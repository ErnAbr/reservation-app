const Client = require("../models/client.model");

async function validateReservationTime(req, res, next) {
  try {
    const client = new Client(req.body);
    const newDate = new Date(client.registrationDate);
    newDate.setHours(newDate.getHours() + 2);
    const hours = newDate.getUTCHours();
    const minutes = newDate.getUTCMinutes();

    if (hours < 8 || hours > 18 || (hours === 18 && minutes > 0)) {
      return res
        .status(400)
        .send({ message: "Please Select Valid Reservation Time" });
    }

    const registrationDate = new Date(req.body.registrationDate);
    const startOfMinute = new Date(registrationDate);
    startOfMinute.setSeconds(0, 0);
    const endOfMinute = new Date(startOfMinute);
    endOfMinute.setMinutes(endOfMinute.getMinutes() + 1);

    const count = await Client.countDocuments({
      registrationDate: {
        $gte: startOfMinute,
        $lt: endOfMinute,
      },
    });

    if (count >= 2) {
      return res
        .status(400)
        .send({ message: "Reservation limit reached for this time slot." });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = validateReservationTime;
