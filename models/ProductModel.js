const mongoose = require("mongoose");


let ProductSchema = new mongoose.Schema({
  booksName: {
    type: String,
    required: true,
  },
  booksDesc: {
    type: String,
    required: true,
  },
  bookPrice: {
    type: String,
    required: true,
  },
  bookSellPrice: {
    type: String,
    required: true,
  },
  bookImg: {
    type: String,
    required: true,
  },
  bookRating: {
    type: String,
    required: true,
  },
  soldOut: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
