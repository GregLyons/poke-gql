/* 
  Resolvers for Item.

  db is a mysql2 database instance. 

  The 'item' table has columns:
    'generation_id'
    'item_id'
    'item_name'
    'item_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  basicEdge,
  introductionConnection,
  basicJunctionConnection,
  parentPK,
} = require('./helpers.js');
const itemPK = parentPK('item');

//#endregion

// Query
/*
    itemByID(id)
    itemByName(name)
    items(
      cursor,
      limit,
      generation,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  itemByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM item
        WHERE generation_id = ${generation}
        AND item_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  items: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM item
        WHERE generation_id = ${generation}
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
}

//#endregion

// Item
/*
    id
    boostsType
    boostsUsageMethod
    causesStatus
    descriptions
    modifiesStat
    name
    requiresPokemon
    resistsType
    resistsUsageMethod
*/
//#region

const Item = {
  effects: itemPK,

  formattedName: async (parent, args, context, info) => {
    return parent.item_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.item_name
  },

  requiresPokemon: itemPK,

  resistsStatus: itemPK,
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  ItemGenerationConnection: introductionConnection('item'),
  ItemGenerationEdge: basicEdge(),

  ItemEffectConnection: basicJunctionConnection('item', 'effect'),
  ItemEffectEdge: basicEdge(),

  ItemRequiresPokemonConnection: basicJunctionConnection('item', 'pokemon', 'requires'),
  ItemRequiresPokemonEdge: basicEdge(),

  ItemResistsStatusConnection: basicJunctionConnection('item', 'status', 'resist'),
  ItemResistsStatusEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Item,
  ...ConnectionsAndEdges,
}