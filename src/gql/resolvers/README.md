# General structure

Each entity has its own `.js` file containing resolvers for all the types defined in its corresponding `.gql` file in `../typeDefs`. These resolvers are all gathered in `index.js` and then exported. 

`helpers.js` contains the bulk of the actual code, which is heavily reused throughout the rest of the files. We have divided it into `#region`s to aid understanding. 

## Structure of resolver files

Each resolver file consists of three main regions: 

- A 'Query' region, where the resolvers for the `Query` type extension in the corresponding `.gql` file are defined
- A region for the entity (e.g. 'Ability'), where the resolvers for the fields in the corresponding `.gql` file are defined
  - The `parent` is the database result from the top-level Query, so for scalar fields, the desired value is an attribute of the `parent` object.
  - For `Connection` fields, we pass down the primary key of the parent.
- A region for connections and edges, where the resolvers for the `Edges` and `Connections` in the corresponding `.gql` file are defined.
  - The `parent` for the `Connection` and `Edge` resolvers is the primary key passed down from the field resolver in the `Node`.
  - Most `Connection`s are resolved by looking up the value in an appropriate junction table. 
    - The `junctionConnection` function imported from `helpers.js` is used to set up the corresponding `DataLoader` objects for lazy loading.
    - The first argument to `junctionConnection` should be the name of the entity being resolved, and the second should be exactly or very similar to the name of the field of interest.
  - `helpers.js` defines various functions which are used to resolve the `Edge`s. Most of them just pass down the `parent` object from the `Connection`.

# Extended example: Adding Natures

Similarly to the `../typeDefs` step, we need to modify four files:

- Add the `nature.js` file
- Modify the `item.js` and `stat.js` files
- Modify the `index.js` file.

## `nature.js`

Following the structure described in the section above, we need to add a 'Query' region for top-level queries, a 'Nature' region for resolving the fields of `Nature` `Node`s, and a 'Connections and edges' region for resolving `Nature` `Connection`s and `Edge`s. 

Most of what needs to be added is explained above. The `generationConnection` and `introductionConnection` functions are explained in the comments of `helpers.js`.

## `item.js` and `stat.js` 

For each of the modifications to the SDL type definition files `item.gql` and `stat.gql`, we make a corresponding modification to the resolver files `item.js` and `stat.js` respectively, as can be seen by looking at the source code.

## `index.js` 

`require()` `./nature.js` and add it to the `resolvers` object. Now we can move onto the loaders step, in `../../loaders`.