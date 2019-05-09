const mongoose = require('mongoose');
const feedData = require('./feed-data');

// Init mongodb connection
const options = {
  reconnectTries: 100,
  reconnectInterval: 500,
  useNewUrlParser: true,
  autoReconnect: true,
};

mongoose.connect('mongodb://root:example@mongo:27017/dsv?authSource=admin', options)
  .then(() => console.log(`Successfully connect to mongodb`))
  .then(() => feedData())
  .catch(err => console.error(err));
