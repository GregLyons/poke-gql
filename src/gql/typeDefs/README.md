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

    abilities(pagination: {limit: 30}, filter: {startsWith: "a"}) {
      name
      pokemon(filter: {introducedAfter: 7}) {
        count
        edges(pagination: {limit: 10, offset: 5}) {
          node {
            name
            speciesName
          }
          slot
        }
      }
    }

selects the following information:
  - Up to 30 `Ability` `Node`s, whose name starts with the letter 'a'
  - The name of these `Ability` `Node`s
  - For each `Ability` `Node`, a `AbilityPokemonConnection`, giving
    - The number of `Pokemon` introduced after `Generation` 7 with the `Ability`
    - An array of `AbilityPokemonEdge`s, of size at most 10 (and offset by 5 in the database), each of which consists of
      - The `Pokemon` `Node` at the end of the `Edge`, accessible through the `node` argument (here we access the `name` and `speciesName` of the `Pokemon`); by the `filter` argument passed to the `pokemon` field above, all of these `Pokemon` were introduced in `Generation` 7 or later.
      - The slot which this `Ability` occupies on the Pokemon ('ONE', 'TWO', or 'HIDDEN'); note how this is a feature of the relationship between abilities and Pokemon themselves, rather than a property of one of the two entities in the relationship.

# Extended example: Adding Natures

