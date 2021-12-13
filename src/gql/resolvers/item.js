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
  queryEntities,
  queryEntityByColumn,

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
  itemByName: queryEntityByColumn('item', 'name'),

  items: queryEntities('item'),
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

  class: parent => parent.item_class.toUpperCase(),

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