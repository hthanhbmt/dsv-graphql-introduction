const mongoose = require('mongoose');
const booksData = require('../../data/books.json');
const Books = require('../models/books');

// init mongodb connection
const options = {
  reconnectTries: 100,
  reconnectInterval: 500,
  useNewUrlParser: true,
  autoReconnect: true,
};

const feedData = async () => {
  console.log('(Books) inserting feed data');
  if (await Books.countDocuments() === 0) {
    console.log('(Books) done inserting feed data');
    await Books.insertMany(booksData);
  } else {
    console.log('(Books) feed data already inserted');
  }
};

mongoose.connect('mongodb://root:example@mongo:27017/dsv?authSource=admin', options)
  .then(() => console.log('🌍 Successfully connect to mongodb'))
  .then(() => feedData())
  .catch(err => console.error(err));
