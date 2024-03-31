const mongoose = require("mongoose");

//sub-schema for the "menu" items
const menuItemSchema = new mongoose.Schema({
  dish: { type: String, required: true },
  type: { type: String, required: false },
  imageUrl: { type: String, required: true },
  chat: { type: String, required: false },
  edible: { type: String, required: false },
  ingredients: { type: String, required: false },
  information: { type: String, required: false },
});

//main schema for the entire document
const Menu = new mongoose.Schema({
  meal: { type: String, required: true },
  diningHall: { type: String, required: true },
  time: { type: String, required: true },
  menu: [menuItemSchema],
});

module.exports = mongoose.model("Menu", Menu);
