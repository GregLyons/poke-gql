# General structure

All the type definitions are defined in `.gql` files, gathered in `index.js`, and exported. `helpers.gql` defines `interface`s and `input`s which are used throughout the rest of the schema. 

There are dozens of `Edge` and `Connection` types, and they are all named so that their meaning can usually be inferred from only their name and an understanding of the 'Connection'-'Edge' pattern (described below) without further documentation.

## Nodes, Edges, and Connections

`Node`s are entities, such as Abilities, Pokemon, etc. All of these entities have relationships between them, e.g. Pokemon have Abilities and learn Moves, and they can also evolve into other Pokemon. I use the 'Connection'-'Edge' pattern to represent these relationships.

Every field which would go from one entity class to another, such as the `pokemon` field of the `Ability` entity class, is of (an implementation of) the `Connection` type. These Connections follow the pattern of the starting `Node`, followed by an optional verb, followed by the ending `Node`, e.g. `AbilityPokemonConnection`, `AbilityModifiesStatConnection`, `StatModifiedByAbilityConnection`, for Connections from `Ability` to `Pokemon`, `Ability` to `Stat`, and `Stat` to `Ability`, respectively. 

`Connections` almost always consist of the following:
  - A `filter` argument for filtering results by various parameters, depending on the ending `Node` (e.g. filtering `Pokemon` by when they were introduced)
  - An `edges` field, which is an array of `Edges` (explained below) to the ending `Node`s. Also takes a `pagination` argument for limit-offset pagination and sorting/ordering results.
  - `count`, an integer counting the number of `edges` in the connection, subject to the `filter` argument (but not to the `pagination` argument for the `edges` field. For `Connection`s to `Generation` entities, there is usually not a `count` since the `count` will be one.

`Edges` consist of the following:
  - A `node` argument giving access to the actual ending `Node`.
  - Other optional arguments describing the relationship further (see example below).

## Example query

For example, the query

    abilities(pagination: {limit: 3}, filter: {startsWith: "a"}) {
      name
      pokemon(filter: {introducedAfter: 7}) {
        count
        edges(pagination: {limit: 2}) {
          node {
            name
            speciesName
          }
          slot
        }
      }
    }

selects the following information:
  - Up to 3 `Ability` `Node`s, whose name starts with the letter 'a'
  - The name of these `Ability` `Node`s
  - For each `Ability` `Node`, a `AbilityPokemonConnection`, giving
    - `count`: The total number of `Pokemon` introduced after `Generation` 7 with the `Ability`
    - `edges`: An array of `AbilityPokemonEdge`s, of size at most 2, each of which consists of
      - The `Pokemon` `Node` at the end of the `Edge`, accessible through the `node` argument (here we access the `name` and `speciesName` of the `Pokemon`); by the `filter` argument passed to the `pokemon` field above, all of these `Pokemon` were introduced in `Generation` 7 or later.
      - The slot which this `Ability` occupies on the Pokemon ('ONE', 'TWO', or 'HIDDEN'); note how this is a feature of the relationship between abilities and Pokemon themselves, rather than a property of one of the two entities in the relationship.

As a final note, remember that `Edge`s also contain information about the relationship. For a `PokemonMoveConnection` between a `Pokemon` and a `Move` `Node`, representing that that Pokemon can learn that Move, there may be multiple edges between those two `Node`s, one for each possible method that the Pokemon can learn the Move (e.g. through breeding, through leveling up, etc.).

# Extended example: Adding Natures

We need to add a new `nature.gql` file. Since Natures are related to Items and to Stats, we need to add fields to those two `.gql` files as well. Unlike in `poke-db`, we need to write fields for both ends of each relationship; virutally all the relationships in the API are symmetric.

## `nature.gql`

Since we're adding a new entity class, we need to define a new `Node` type. We have a separate `.gql` file for each entity class/`Node` type, so we need to add `nature.gql`. This file consists of:

- An extension of the `Query` type for top level queries, which should be very similar to most other `Node`s (e.g. see `ability.gql`).
- The `Nature` type implementing `Node`. Here we add all the fields for the relationships. In particular, we need `confusedByItem` and `modifiesStat`, as well as various scalar fields.
- Several `Connection` and `Edge` types.
- A `NatureFilter` input type for filtering `Nature` `Node`s.

For the understanding the `Connection`s and `Edge` types, see the discussion above. The `NatureModifiesStatEdge` contains several pieces of data about the relationship: the `stage`, `multiplier`, `chance`, and `recipient` fields. 

The `NatureGenerationConnection`/`Edge` and `NatureIntroductionConnection`/`Edge` types give generational info about the Nature (remember that we have a database row for each Nature in each generation, so in turn we'll have a GraphQL `Nature` instance for each Nature in each generation).

## `item.gql`

We add a new `confusesNature` field to the `Item` `Node` type, as well as the corresponding `ItemConfusesNatureConnection`/`Edge` types. 

## `stat.gql`

We add a new `modifiedByNature` field to the `Stat` `Node` type, as well as the corresponding `StatModifiedByNatureConnection`/`Edge` types.

## `index.js`

Finally, we need to import our SDL file, `nature.gql`, into `index.js` and then add it to the `typeDefs` object.

Now we can move onto the `../resolvers` folder.