require('dotenv').config();
/*
  Set up poke_gql database.
*/
const {db} = require('./models/index.js');

/*
  Set up GraphQL Server.
*/
const { ApolloServer } = require('apollo-server');

const { schema } = require('./gql/index.js');

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    db,
  })
})

server
  .listen()
  .then(({ url }) => 
    console.log(`Server is running on ${url}.`)
  );