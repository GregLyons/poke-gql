# General structure

- `typeDefs` contains all the necessary SDL `.gql` files for the GraphQL schema.
- `resolvers` contains all the resolvers.

These type definitions and resolvers are combined in `index.js` and using `makeExecutableSchema` from `graphql-tools`, and then exported to be used by Apollo Server in `../index.js`.

# Extended example: Adding Natures

Nothing needs to be done in `index.js`, but the necessary type definitions and resolvers need to be added in `typeDefs` and `resolvers`, respectively. After that, move onto `../loaders`.