/* 
  Resolvers for Move.

  db is a mysql2 database instance. 

  The 'move' table has columns:
    'generation_id'
    'move_id'
    'move_name'
    'move_formatted_name'
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
  learnsetEdge,
  modifyStatEdge,
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
const movePK = parentPK('move')
const movePKDebut = parentPKDebut('move');
const getID = primaryKeyToID('move');

//#endregion

// Query
//#region

const Query = {
  moveByName: queryEntitiesByColumn('move', 'name'),

  movesByName: queryEntitiesByColumn('move', 'names'),

  moveByPSID: queryEntitiesByColumn('move', 'psID'),

  movesByPSID: queryEntitiesByColumn('move', 'psIDs'),

  moves: topLevelBulkQuery('move'),
}

//#endregion

// Move
//#region

const Move = {
  id: getID,

  accuracy: parent => parent.pmove_accuracy,

  category: parent => parent.pmove_category.toUpperCase(),

  causesStatus: movePK,

  contact: parent => parent.pmove_contact,

  createsFieldState: movePK,
  
  descriptions: movePK,

  effects: movePK,
  
  enablesMove: movePK,

  enhancedByFieldState: movePK,

  formattedName: parent => parent.pmove_formatted_name,

  generation: movePK,

  hinderedByFieldState: movePK,

  interactedWithByMove: movePK,

  interactsWithMove: movePK,
  
  introduced: movePKDebut,
  
  modifiesStat: movePK,
  
  name: parent => parent.pmove_name,

  pokemon: movePK,

  psID: parent => parent.pmove_ps_id,

  power: parent => parent.pmove_power,

  pp: parent => parent.pmove_pp,

  preventsUsageMethod: movePK,

  priority: parent => parent.pmove_priority,

  removedFromSwSh: parent => parent.pmove_removed_from_swsh,

  removedFromBDSP: parent => parent.pmove_removed_from_bdsp,

  removesFieldState: movePK,

  requiresItem: movePK,

  requiresMove: movePK,

  requiresPokemon: movePK,

  requiresType: movePK,

  resistsStatus: movePK,

  target: parent => parent.pmove_target.toUpperCase(),

  type: movePK,

  typeName: parent => parent.pmove_ptype_name.toUpperCase(),

  usageMethods: movePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  MoveConnection: topLevelConnection('move'),
  MoveEdge: basicEdge(),

  MoveCausesStatusConnection: junctionConnection('move', 'causesStatus'),
  MoveCausesStatusEdge: causeStatusEdge(),
  
  MoveCreatesFieldStateConnection: junctionConnection('move', 'createsFieldState'),
  MoveCreatesFieldStateEdge: turnsEdge(),

  MoveDescriptionConnection: junctionConnection('move', 'description'),
  MoveDescriptionEdge: descriptionEdge(),

  MoveEffectConnection: junctionConnection('move', 'effect'),
  MoveEffectEdge: basicEdge(),
  
  MoveEnablesMoveConnection: junctionConnection('move', 'enablesMove'),
  MoveEnablesMoveEdge: basicEdge(),

  MoveEnhancedByFieldStateConnection: junctionConnection('move', 'enhancedByFieldState'),
  MoveEnhancedByFieldStateEdge: basicEdge(),
  
  MoveGenerationConnection: generationConnection('move'),
  MoveGenerationEdge: basicEdge(),

  MoveHinderedByFieldStateConnection: junctionConnection('move', 'hinderedByFieldState'),
  MoveHinderedByFieldStateEdge: basicEdge(),

  MoveInteractedWithByMoveConnection: junctionConnection('move', 'interactedWithByMove'),
  MoveInteractedWithByMoveEdge: basicEdge(),

  MoveInteractsWithMoveConnection: junctionConnection('move', 'interactsWithMove'),
  MoveInteractsWithMoveEdge: basicEdge(),

  MoveIntroductionConnection: introductionConnection('move'),
  MoveIntroductionEdge: basicEdge(),
  
  MoveModifiesStatConnection: junctionConnection('move', 'modifiesStat'),
  MoveModifiesStatEdge: modifyStatEdge(),

  MovePokemonConnection: junctionConnection('move', 'pokemon'),
  MovePokemonEdge: learnsetEdge(),

  MovePreventsUsageMethodConnection: junctionConnection('move', 'preventsUsageMethod'),
  MovePreventsUsageMethodEdge: basicEdge(),
  
  MoveRemovesFieldStateConnection: junctionConnection('move', 'removesFieldState'),
  MoveRemovesFieldStateEdge: basicEdge(),
  
  MoveRequiresItemConnection: junctionConnection('move', 'requiresItem'),
  MoveRequiresItemEdge: basicEdge(),

  MoveRequiresMoveConnection: junctionConnection('move', 'requiresMove'),
  MoveRequiresMoveEdge: basicEdge(),

  MoveRequiresPokemonConnection: junctionConnection('move', 'requiresPokemon'),
  MoveRequiresPokemonEdge: basicEdge(),

  MoveRequiresTypeConnection: junctionConnection('move', 'requiresType'),
  MoveRequiresTypeEdge: basicEdge(),

  MoveResistsStatusConnection: junctionConnection('move', 'resistsStatus'),
  MoveResistsStatusEdge: basicEdge(),

  MoveTypeConnection: junctionConnection('move', 'type'),
  MoveTypeEdge: basicEdge(),

  MoveUsageMethodConnection: junctionConnection('move', 'usageMethod'),
  MoveUsageMethodEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Move,
  ...ConnectionsAndEdges,
}