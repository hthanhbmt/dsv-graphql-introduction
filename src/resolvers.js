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

const books = [
  {
    id: '1',
    title: 'De men phieu luu ky',
    publisher: '2',
    authors: ['1'],
  },
  {
    id: '2',
    title: 'Toi thay hoa vang tren co xanh',
    publisher: '1',
    authors: ['2'],
  },
  {
    id: '3',
    title: 'Kinh van hoa',
    publisher: '1',
    authors: ['2'],
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
    books: () => books,
    book: (root, { id }) => books.find(b => b.id === id),
    publishers: () => publishers,
    publisher: (root, { id }) => publishers.find(p => p.id === id),
  },
  Author: {
    books(author) {
      const bookIds = author.books;
      const res = books.filter(b => bookIds.includes(b.id));
      return res;
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
      const res = books.filter(b => bookIds.includes(b.id));
      return res;
    },
  },
};

module.exports = resolvers;
