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
  queryEntitiesByColumn,

  basicEdge,
  causeStatusEdge, 
  descriptionEdge,
  modifyStatEdge,
  multiplierEdge,
  powerEdge,
  turnsEdge,

  junctionConnection,
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
  itemByName: queryEntitiesByColumn('item', 'name'),

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
  activatedByFieldState: itemPK,

  boostsType: itemPK,
  
  boostsUsageMethod: itemPK,

  causesStatus: itemPK,

  class: parent => parent.item_class.toUpperCase(),

  descriptions: itemPK,

  effects: itemPK,

  enablesMove: itemPK,

  enablesPokemon: itemPK,

  extendsFieldState: itemPK,

  formattedName: parent => parent.item_formatted_name,

  generation: parent => parent.generation_id,

  ignoresFieldState: itemPK,
  
  introduced: parent => parent.introduced,
  
  modifiesStat: itemPK,

  name: parent => parent.item_name,

  naturalGift: itemPK,

  requiresPokemon: itemPK,

  resistsFieldState: itemPK,

  resistsStatus: itemPK,

  resistsType: itemPK,

  resistsUsageMethod: itemPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  ItemActivatedByFieldStateConnection: junctionConnection('item', 'fieldState', 'activatedBy'),
  ItemActivatedByFieldStateEdge: basicEdge(),
  
  ItemBoostsTypeConnection: junctionConnection('item', 'type', 'boosts'),
  ItemBoostsTypeEdge: multiplierEdge(),
  
  ItemBoostsUsageMethodConnection: junctionConnection('item', 'usageMethod', 'boosts'),
  ItemBoostsUsageMethodEdge: multiplierEdge(),
  
  ItemCausesStatusConnection: junctionConnection('item', 'status', 'causes'),
  ItemCausesStatusEdge: causeStatusEdge(),

  ItemDescriptionConnection: junctionConnection('item', 'description'),
  ItemDescriptionEdge: descriptionEdge('item'),
  
  ItemEffectConnection: junctionConnection('item', 'effect'),
  ItemEffectEdge: basicEdge(),
  
  ItemEnablesMoveConnection: junctionConnection('item', 'move', 'enables'),
  ItemEnablesMoveEdge: basicEdge(),
  
  ItemEnablesPokemonConnection: junctionConnection('item', 'pokemon', 'enables'),
  ItemEnablesPokemonEdge: basicEdge(),
  
  ItemExtendsFieldStateConnection: junctionConnection('item', 'fieldState', 'extends'),
  ItemExtendsFieldStateEdge: turnsEdge(),
  
  ItemGenerationConnection: generationConnection('item'),
  ItemGenerationEdge: basicEdge(),
  
  ItemIgnoresFieldStateConnection: junctionConnection('item', 'fieldState', 'ignores'),
  ItemIgnoresFieldStateEdge: basicEdge(),

  ItemIgnoresFieldStateConnection: junctionConnection('item', 'fieldState', 'ignores'),
  ItemIgnoresFieldStateEdge: basicEdge(),

  ItemIntroductionConnection: introductionConnection('item'),
  ItemIntroductionEdge: basicEdge(),
  
  ItemModifiesStatConnection: junctionConnection('item', 'stat', 'modifies'),
  ItemModifiesStatEdge: modifyStatEdge(),

  ItemNaturalGiftConnection: junctionConnection('item', 'naturalGift'),
  ItemNaturalGiftEdge: powerEdge(),
  
  ItemRequiresPokemonConnection: junctionConnection('item', 'pokemon', 'requires'),
  ItemRequiresPokemonEdge: basicEdge(),
  
  ItemResistsFieldStateConnection: junctionConnection('item', 'fieldState', 'resists'),
  ItemResistsFieldStateEdge: basicEdge(),

  ItemResistsStatusConnection: junctionConnection('item', 'status', 'resists'),
  ItemResistsStatusEdge: basicEdge(),

  ItemResistsTypeConnection: junctionConnection('item', 'type', 'resists'),
  ItemResistsTypeEdge: multiplierEdge(),
  
  ItemResistsUsageMethodConnection: junctionConnection('item', 'usageMethod', 'resists'),
  ItemResistsUsageMethodEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  Item,
  ...ConnectionsAndEdges,
}