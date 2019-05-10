const Books = require('./models/books');
const psql = require('./init/postgres');

const publishers = [
  {
    id: '1',
    name: 'Nha xuat ban Tre',
    books: ['2', '3'],
  },
  {
    id: '2',
    name: 'Nha xuat ban Kim Dong',
    books: ['1'],
  },
];

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
    publishers: () => publishers,
    publisher: (root, { id }) => publishers.find(p => p.id === id),
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
    publisher(book) {
      const publisherId = book.publisher;
      const res = publishers.find(p => p.id === publisherId);
      return res;
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
