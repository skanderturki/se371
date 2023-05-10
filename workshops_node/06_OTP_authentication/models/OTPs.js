const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OTPEntry", otpSchema);