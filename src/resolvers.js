const Books = require('./models/books');
const psql = require('./init/postgres');
const axios = require('axios');
const pubsub = require('./pubsub');

const PUBLISHERS_API = 'https://dsv-graphql-introduction.free.beeceptor.com/publishers';

const resolvers = {
  Query: {
    authors: async () => {
      const res = await psql.query('SELECT * FROM authors');
      return res && res.rows;
    },
    author: async (root, { id }) => {
      const res = await psql.query('SELECT * FROM authors WHERE id = $1', [id]);
      return res && res.rows && res.rows.length && res.rows[0];
    },
    books: () => Books.find(),
    book: (root, { id }) => Books.findOne({ id }),
    publishers: async () => {
      const res = await axios.get(PUBLISHERS_API);
      return res && res.data;
    },
    publisher: async (root, { id }) => {
      const endpoint = `${PUBLISHERS_API}/${id}`;
      const res = await axios.get(endpoint);
      return res && res.data;
    },
  },
  Mutation: {
    addBook: async (root, { book }) => {
      const b = await Books.create(book);
      // Publish new message
      pubsub.publish('bookAdded', { bookAdded: b });
      return b;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('bookAdded'),
    },
  },
  Author: {
    books(author) {
      const bookIds = author.books;
      return Books.find({
        id: {
          $in: bookIds,
        },
      });
    },
  },
  Book: {
    authors: async (book) => {
      const authorIds = book.authors;
      const res = await psql.query('SELECT * FROM authors WHERE id = $1', authorIds);
      return res && res.rows;
    },
    publisher: async (book) => {
      const publisherId = book.publisher;
      const endpoint = `${PUBLISHERS_API}/${publisherId}`;
      const res = await axios.get(endpoint);
      return res && res.data;
    }
  },
  Publisher: {
    books(publisher) {
      const bookIds = publisher.books;
      return Books.find({
        id: {
          $in: bookIds,
        },
      });
    },
  },
};

module.exports = resolvers;
