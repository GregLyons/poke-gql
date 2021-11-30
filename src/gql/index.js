const { makeExecutableSchema } = require('@graphql-tools/schema')
const { typeDefs } = require('./typeDefs/index.js');
const { resolvers } = require('./resolvers/index.js');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = {
  schema,
};