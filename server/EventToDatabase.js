const mongoose = require("mongoose");
const foodEventSchema = require("./model/FoodEventSchema");
const cron = require("node-cron");
const mongoDBURI = process.env.ATLAS_URI;
require("dotenv").config();

const foodEvent = async (eventType, date, time, venue, note, link) => {
  let templateForEvent = {};
  templateForEvent.eventType = eventType;
  templateForEvent.date = date;
  templateForEvent.time = time;
  templateForEvent.venue = venue;
  templateForEvent.note = note;
  templateForEvent.link = link;

  const newEvent = new foodEventSchema(templateForEvent);
  await newEvent.save();
  console.log("New event saved.");
};

//save event type to database
const saveFoodEvent = (foodEvent) => {
  mongoose
    .connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => foodEvent)
    .then(() => {
      console.log("Database connection closed.");
    })
    .catch((error) => {
      console.error("Error connecting to the MongoDB database:", error);
    });
};

module.exports = { foodEvent, saveFoodEvent };
