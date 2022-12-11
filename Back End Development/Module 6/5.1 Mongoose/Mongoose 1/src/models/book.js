const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  // TODO: Write your code here.
  title: String,
  author: String,
  description: String,
  cost: Number,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
