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
  
  parentPK,
} = require('./helpers.js');
const movePK = parentPK('move');

//#endregion

// Query
/*
    moveByID(id)
    moveByName(name)
    moves(
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
  moveByName: queryEntitiesByColumn('move', 'name'),

  // TODO: cursor
  moves: queryEntities('move'),
}

//#endregion

// Move
/*
    id
    descriptions
    enables
    enablesMove
    requires
*/
//#region

const Move = {
  accuracy: parent => parent.pmove_accuracy,

  causesStatus: movePK,

  contact: parent => parent.pmove_contact,

  createsFieldState: movePK,
  
  descriptions: movePK,

  effects: movePK,
  
  enablesMove: movePK,

  enhancedByFieldState: movePK,

  formattedName: parent => parent.pmove_formatted_name,

  generation: parent => parent.generation_id,

  hinderedByFieldState: movePK,

  interactedWithByMove: movePK,

  interactsWithMove: movePK,
  
  introduced: parent => parent.introduced,
  
  modifiesStat: movePK,
  
  name: parent => parent.pmove_name,

  pokemon: movePK,

  power: parent => parent.pmove_power,

  pp: parent => parent.pmove_pp,

  priority: parent => parent.pmove_priority,

  removesFieldState: movePK,

  requiresItem: movePK,

  requiresMove: movePK,

  requiresPokemon: movePK,

  requiresType: movePK,

  resistsStatus: movePK,

  target: parent => parent.pmove_target.toUpperCase(),

  type: movePK,

  usageMethod: movePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
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