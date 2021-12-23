# Main idea and code flow

The overall goal of this code is to create a GraphQL API for accessing data from the Pokemon games relevant to competitive play. This API has the MySQL database set up in [this repository](https://github.com/GregLyons/poke-db) as a backend.

The code flows in the following manner:

1. GraphQL types are defined in `gql/typeDefs`
2. GraphQL resolvers are defined in `gql/resolvers`
3. The schema defined in Steps 1 and 2 are combined in `gql/index.js` and exported to serve as the schema for the Apollo Server set up in `index.js`.
4. Database connections and queries are handled in `models`
5. DataLoaders for lazy loading are set up in `loaders`
6. The database and loaders set up in Steps 4 and 5 comprise the `context` object for the Apollo Server, `context.db` and `context.loaders`, respectively.
    - The resolvers for the top-level Queries execute statements defined in `models` against `context.db`.
    - In order to resolve Connections between entities, each connection loads entities into the `context.loaders` object, and only once all the starting Nodes in the Connection have been loaded does the necessary database query execute.

# Extended example: Adding Natures

In [the `poke-db`](https://github.com/GregLyons/poke-db) repository I detailed an example where I added a new entity class, Natures, to the database. One of the goals of the example was to help clarify the function of the code, and for that same end I continue the example here. As I stated there, Natures are already part of the API, but I have written everything so that one can simply follow a single process to add new entity classes to the API.

Like in that repo, I will write several other `README.md` files across the directories in this repo, with a section at the bottom discussing what needs to be done in each folder to add Natures to the API. 

At this point in the example, we have three tables in our MySQL database:

- `nature`, an entity table
- `nature_modifies_stat`, a junction table between Natures and Stats
- `item_confuses_nature`, a junction table between Items and Natures.

To add Natures to the API now, we must first add it to the GraphQL schema in the `gql` folder.