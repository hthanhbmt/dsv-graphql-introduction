const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: String
    name: String
    avatar: String
    books: [Book]
  }

  type Book {
    id: String
    title: String
    authors: [Author]
    publisher: Publisher    
  }
  
  type Publisher {
    id: String
    name: String
    books: [Book]
  }

  type Query {
    authors: [Author]
    author(id: ID!): Author
    books: [Book]
    book(id: ID!): Book
    publishers: [Publisher]
    publisher(id: ID!): Publisher
  }

  input BookInput {
    id: ID!
    title: String!
    publisher: String!
    authors: [String]!
  }

  type Mutation {
    addBook(book: BookInput!): Book
  }

  type Subscription {
    bookAdded: Book
  }
`;

module.exports = typeDefs;
