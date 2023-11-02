const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("clients", ClientSchema);
