const mongoose = require("mongoose");

const foodEventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  note: { type: String, required: false },
  link: { type: String, required: false },
});

module.exports = mongoose.model("foodEventSchema", foodEventSchema);
