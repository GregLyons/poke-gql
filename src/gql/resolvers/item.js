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
  causeStatusEdge, 
  modifyStatEdge,
  multiplierEdge,
  powerEdge,

  basicJunctionConnection,
  generationConnection,
  introductionConnection,
  
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
    descriptions
*/
//#region

const Item = {
  boostsType: itemPK,
  
  boostsUsageMethod: itemPK,

  causesStatus: itemPK,

  descriptions: itemPK,

  effects: itemPK,

  enablesMove: itemPK,

  enablesPokemon: itemPK,

  formattedName: parent => parent.item_formatted_name,

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  modifiesStat: itemPK,

  name: parent => parent.item_name,

  naturalGift: itemPK,

  requiresPokemon: itemPK,

  resistsStatus: itemPK,

  resistsType: itemPK,

  resistsUsageMethod: itemPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  ItemBoostsTypeConnection: basicJunctionConnection('item', 'type', 'boosts'),
  ItemBoostsTypeEdge: multiplierEdge(),

  ItemBoostsUsageMethodConnection: basicJunctionConnection('item', 'usageMethod', 'boosts'),
  ItemBoostsUsageMethodEdge: multiplierEdge(),
  
  ItemCausesStatusConnection: basicJunctionConnection('item', 'status', 'causes'),
  ItemCausesStatusEdge: causeStatusEdge(),
  
  ItemEffectConnection: basicJunctionConnection('item', 'effect'),
  ItemEffectEdge: basicEdge(),

  ItemEnablesMoveConnection: basicJunctionConnection('item', 'move', 'enables'),
  ItemEnablesMoveEdge: basicEdge(),

  ItemEnablesPokemonConnection: basicJunctionConnection('item', 'pokemon', 'enables'),
  ItemEnablesPokemonEdge: basicEdge(),

  ItemGenerationConnection: generationConnection('item'),
  ItemGenerationEdge: basicEdge(),

  ItemIntroductionConnection: introductionConnection('item'),
  ItemIntroductionEdge: basicEdge(),
  
  ItemModifiesStatConnection: basicJunctionConnection('item', 'stat', 'modifies'),
  ItemModifiesStatEdge: modifyStatEdge(),

  ItemNaturalGiftConnection: basicJunctionConnection('item', 'naturalGift'),
  ItemNaturalGiftEdge: powerEdge(),
  
  ItemRequiresPokemonConnection: basicJunctionConnection('item', 'pokemon', 'requires'),
  ItemRequiresPokemonEdge: basicEdge(),
  
  ItemResistsStatusConnection: basicJunctionConnection('item', 'status', 'resists'),
  ItemResistsStatusEdge: basicEdge(),

  ItemResistsTypeConnection: basicJunctionConnection('item', 'type', 'resists'),
  ItemResistsTypeEdge: multiplierEdge(),
  
  ItemResistsUsageMethodConnection: basicJunctionConnection('item', 'usageMethod', 'resists'),
  ItemResistsUsageMethodEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  Item,
  ...ConnectionsAndEdges,
}