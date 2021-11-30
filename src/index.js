const { ApolloServer } = require('apollo-server');

const { schema } = require('./gql/index.js');

const server = new ApolloServer({
  schema,
})

server
  .listen()
  .then(({ url }) => 
    console.log(`Server is running on ${url}.`)
  );