const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5005;

//connect to mongobd database
const ATLAS_URI = process.env.ATLAS_URI;
mongoose.connect(ATLAS_URI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const Menu = require("./model/MenuSchema");
const foodEventSchema = require("./model/FoodEventSchema");
const { scheduleMenuSave } = require("./MenuToDatabase");
const { foodEvent, saveFoodEvent } = require("./EventToDatabase");

//API endpoint to fetch all data objects from the database
app.get("/api/full-menu", async (req, res) => {
  try {
    const dataObjects = await Menu.find();
    res.json(dataObjects);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const {
  transporter,
  isAlpha,
  containsMaliciousHeaders,
  isValidEmail,
} = require("./SendEmail");

app.post("/api/send-email", async (req, res) => {
  const { fullName, email, message } = req.body;
  if (
    !fullName.trim() ||
    !isAlpha(fullName) ||
    containsMaliciousHeaders(fullName)
  ) {
    return res.status(400).json({ error: "Invalid name data." });
  }
  if (
    !email.trim() ||
    !isValidEmail(email) ||
    containsMaliciousHeaders(email)
  ) {
    return res.status(400).json({ error: "Invalid email data." });
  }
  if (!message.trim() || containsMaliciousHeaders(message)) {
    return res.status(400).json({ error: "Invalid message data." });
  }

  try {
    const mailContent = {
      from: process.env.EMAIL_HOST_USER,
      to: process.env.EMAIL_HOST_USER,
      subject: "[IngreDetect Contact Form] " + fullName.trim(),
      text: `Full Name: ${fullName}\nEmail: ${email.toLowerCase()}\nMessage: ${message.trim()}`,
    };
    await transporter.sendMail(mailContent);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(400).json({ message: "Email sent failed" });
  }
});

//API endpoint to fetch all food events
app.get("/api/events", async (req, res) => {
  try {
    const dataObjects = await foodEventSchema.find();
    res.json(dataObjects);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/admin/post-food-event", async (req, res) => {
  const { password, eventType, date, time, venue, note, link } = req.body;
  if (password === process.env.EVENT_SECRET_KEY) {
    if (
      !eventType.trim() ||
      containsMaliciousHeaders(eventType) ||
      !date.trim() ||
      containsMaliciousHeaders(date) ||
      !time.trim() ||
      containsMaliciousHeaders(time) ||
      !venue.trim() ||
      containsMaliciousHeaders(venue) ||
      containsMaliciousHeaders(note) ||
      containsMaliciousHeaders(link)
    ) {
      return res.status(400).json({ error: "Invalid data." });
    }

    const event = await foodEvent(eventType, date, time, venue, note, link);
    saveFoodEvent(event);
    res.status(200).json({ message: "Event saved successfully." });
  } else {
    res.status(403).send("Access Forbidden");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  scheduleMenuSave();
});
