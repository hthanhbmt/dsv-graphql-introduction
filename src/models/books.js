const mongoose = require('mongoose');
const moment = require('moment');

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
    default: () => moment().format('x'),
  },
});

const booksModel = mongoose.model('books', bookSchema);

module.exports = booksModel;
