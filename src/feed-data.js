const mongoose = require('mongoose');
const booksData = require('../data/books.json');
const Books = require('./models/books');

const feedData = async () => {
  // BOOKS
  console.log('(Books) inserting feed data');
  if (await Books.countDocuments() === 0) {
    console.log('(Books) done inserting feed data');
    await Books.insertMany(booksData);
  } else {
    console.log('(Books) feed data already inserted');
  }
  // AUTHORS
  console.log('(Authors) Inserting feed data');
};

module.exports = feedData;
