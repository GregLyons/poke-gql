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

const LoaderSet = require('./loaders/index.js');

// Very basic authorization
const authorizeHeader = ({ req }) => {
  if (req.headers.authorization !== 123456) throw new Error('Incorrect API key');
}

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // Remove if you don't want authorization
    authorizeHeader({req});
    //

    return {
      ...req,
      db,
      loaders: new LoaderSet(),
    }
  }
})

server
  .listen({
    port: 4000
  })
  .then(({ url }) => 
    console.log(`Server is running on ${url}.`)
  );