# General structure

Here lazy loading is implemented. `index.js` groups together all the loaders into a single `LoaderSet` object and exports it, to be used in the `context` object for Apollo Server. 

Each entity has a corresponding `.js` file, just as in the `../gql/typeDefs` and `../gql/resolvers` folders. Each file defines an entity loader object/class, e.g. `AbilityLoaders`, which extends the `LoadersForEntity` class defined in `helpers.js`. Aside from the attributes inherited from `LoadersForEntity`, each entity loader object has keys, named according to the second argument passed to `junctionConnection` (see `../gql/resolvers/README.md`), corresponding to a field of the entity. 

For example, to resolve the `boostsType` field on `Ability` `Node`s, the `boostsType` key of the `AbilityLoaders` object is used. This key returns information, including the tables to be queried in the database, which are used to construct the query underlying a new `DataLoader` object.

As in the case for the resolvers, the bulk of the code is defined in `helpers.js`. In particular, `LoadersForEntity` gives all the necessary functionality to create the necessary loaders, and to clear them between top-level queries. 

# Extended example: Adding Natures

As usual, we need to add a `nature.js` file, modify the `item.js` and `stat.js` files, and modify the `index.js` file. 

## `nature.js`

We add the `NatureLoaders` object, which extends the `LoadersForEntity` class defined above. We inherit all the loader functionality, and simply add two keys, one for each `Connection`.

We have two `Connection`s, corresponding to the `confusedByItem` and `modifiesStat` fields. We add these keys to the `NatureLoaders` objects. These are functions which take in `pagination` and `filter` arguments, and return an array of info to construct the database query:

1. The `pagination` argument
2. The `filter` argument
3. The table corresponding to the *owner/subject* in the relationship
4. The table corresponding to the *owned/object* in the relationship
5. The name of the junction table
6. A boolean, indicating whether the starting-ending `Node` relationship follows (`false`) or opposes (`true`) the subject-object relationship.

For `confusedByItem`, the corresponding junction table is `item_confuses_nature`. This loader is for `Connection`s starting at `Nature` `Node`s and ending at `Item` `Node`s. The starting `Node` is the *owned/object* in this relationship, whereas the ending `Node` is the *owner/subject*, so the boolean argument should be `true`.

As for `modifiesStat`, the corresponding junction table is `nature_modifies_stat`. Here, the `Nature` is the subject *and* the starting `Node`, so that starting-ending relationship matches the subject-object relationship. Thus, the boolean argument should be `false`.

We should have:

  confusedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'nature', 'item_confuses_nature', true];
  }

  modifiesStat(pagination, filter) {
    return [pagination, filter, 'nature', 'stat', 'nature_modifies_stat', false];
  }

Don't forget to export an instance of the `NatureLoaders` class.

## `item.js`

Add the `confusesNature` key, similarly to the previous step. We should have:

  confusesNature(pagination, filter) {
    return [pagination, filter, 'item', 'nature', 'item_confuses_nature', false];
  }

Note how the last argument is `false`, since now the starting `Node` is the `Item`, which is the subject.

## `stat.js` 

We should have:

    modifiedByNature(pagination, filter) {
      return [pagination, filter, 'nature', 'stat', 'nature_modifies_stat', true];
    }

## `index.js`

Add `nature` to the `LoaderSet` class. Now all the functionality should be in the API! You can test it with `npm start`.