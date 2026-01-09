const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  price: Number
});

module.exports = mongoose.model("Event", EventSchema);
