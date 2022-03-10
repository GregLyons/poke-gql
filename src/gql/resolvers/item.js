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
  topLevelConnection,
  
  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const itemPK = parentPK('item')
const itemPKDebut = parentPKDebut('item');
const getID = primaryKeyToID('item');

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

  itemsByName: queryEntitiesByColumn('item', 'names'),

  itemByPSID: queryEntitiesByColumn('item', 'psID'),

  itemsByPSID: queryEntitiesByColumn('item', 'psIDs'),

  items: topLevelBulkQuery('item'),
}

//#endregion

// Item
//#region

const Item = {
  id: getID,

  activatedByFieldState: itemPK,

  activatedByUsageMethod: itemPK,

  boostsType: itemPK,
  
  boostsUsageMethod: itemPK,

  causesStatus: itemPK,

  class: parent => parent.item_class.toUpperCase(),

  confusesNature: itemPK,
  
  descriptions: itemPK,

  effects: itemPK,

  enablesMove: itemPK,

  enablesPokemon: itemPK,

  extendsFieldState: itemPK,

  formattedName: parent => parent.item_formatted_name,

  formattedPSID: parent => parent.item_formatted_ps_id,

  generation: itemPK,

  ignoresFieldState: itemPK,
  
  introduced: itemPKDebut,
  
  modifiesStat: itemPK,

  name: parent => parent.item_name,

  naturalGift: itemPK,

  psID: parent => parent.item_ps_id,

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
  ItemConnection: topLevelConnection('item'),
  ItemEdge: basicEdge(),

  ItemActivatedByFieldStateConnection: junctionConnection('item', 'activatedByFieldState'),
  ItemActivatedByFieldStateEdge: basicEdge(),

  ItemActivatedByUsageMethodConnection: junctionConnection('item', 'activatedByUsageMethod'),
  ItemActivatedByUsageMethodEdge: basicEdge(),
  
  ItemBoostsTypeConnection: junctionConnection('item', 'boostsType'),
  ItemBoostsTypeEdge: multiplierEdge(),
  
  ItemBoostsUsageMethodConnection: junctionConnection('item', 'boostsUsageMethod'),
  ItemBoostsUsageMethodEdge: multiplierEdge(),
  
  ItemCausesStatusConnection: junctionConnection('item', 'causesStatus'),
  ItemCausesStatusEdge: causeStatusEdge(),

  ItemConfusesNatureConnection: junctionConnection('item', 'confusesNature'),
  ItemConfusesNatureEdge: basicEdge(),

  ItemDescriptionConnection: junctionConnection('item', 'description'),
  ItemDescriptionEdge: descriptionEdge(),
  
  ItemEffectConnection: junctionConnection('item', 'effect'),
  ItemEffectEdge: basicEdge(),
  
  ItemEnablesMoveConnection: junctionConnection('item', 'enablesMove'),
  ItemEnablesMoveEdge: basicEdge(),
  
  ItemEnablesPokemonConnection: junctionConnection('item', 'enablesPokemon'),
  ItemEnablesPokemonEdge: basicEdge(),
  
  ItemExtendsFieldStateConnection: junctionConnection('item', 'extendsFieldState'),
  ItemExtendsFieldStateEdge: turnsEdge(),
  
  ItemGenerationConnection: generationConnection('item'),
  ItemGenerationEdge: basicEdge(),
  
  ItemIgnoresFieldStateConnection: junctionConnection('item', 'ignoresFieldState'),
  ItemIgnoresFieldStateEdge: basicEdge(),

  ItemIgnoresFieldStateConnection: junctionConnection('item', 'ignoresFieldState'),
  ItemIgnoresFieldStateEdge: basicEdge(),

  ItemIntroductionConnection: introductionConnection('item'),
  ItemIntroductionEdge: basicEdge(),
  
  ItemModifiesStatConnection: junctionConnection('item', 'modifiesStat'),
  ItemModifiesStatEdge: modifyStatEdge(),

  ItemNaturalGiftConnection: junctionConnection('item', 'naturalGift'),
  ItemNaturalGiftEdge: powerEdge(),
  
  ItemRequiresPokemonConnection: junctionConnection('item', 'requiresPokemon'),
  ItemRequiresPokemonEdge: basicEdge(),
  
  ItemResistsFieldStateConnection: junctionConnection('item', 'resistsFieldState'),
  ItemResistsFieldStateEdge: basicEdge(),

  ItemResistsStatusConnection: junctionConnection('item', 'resistsStatus'),
  ItemResistsStatusEdge: basicEdge(),

  ItemResistsTypeConnection: junctionConnection('item', 'resistsType'),
  ItemResistsTypeEdge: multiplierEdge(),
  
  ItemResistsUsageMethodConnection: junctionConnection('item', 'resistsUsageMethod'),
  ItemResistsUsageMethodEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  Item,
  ...ConnectionsAndEdges,
}