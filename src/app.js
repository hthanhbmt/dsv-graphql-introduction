const { ApolloServer } = require('apollo-server');
require('./init.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

