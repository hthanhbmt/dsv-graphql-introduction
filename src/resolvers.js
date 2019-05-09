const Books = require('./models/books');

const authors = [
  {
    id: '1',
    name: 'To Hoai',
    books: ['1'],
  },
  {
    id: '2',
    name: 'Nguyen Nhat Anh',
    books: ['2', '3'],
  },
];

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
    authors: () => authors,
    author: (root, { id }) => authors.find(a => a.id === id),
    books: () => Books.find(),
    book: (root, { id }) => books.find(b => b.id === id),
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
    authors(book) {
      const authorIds = book.authors;
      const res = authors.filter(a => authorIds.includes(a.id));
      return res;
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
