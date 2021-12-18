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

const {getPaginationQueryString, getFilterQueryString} = require('../../models/index.js');

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
  MoveCausesStatusConnection: junctionConnection('move', 'status', 'causes'),
  MoveCausesStatusEdge: causeStatusEdge(),
  
  MoveCreatesFieldStateConnection: junctionConnection('move', 'fieldState', 'creates'),
  MoveCreatesFieldStateEdge: turnsEdge(),

  MoveDescriptionConnection: junctionConnection('move', 'description'),
  MoveDescriptionEdge: descriptionEdge(),

  MoveEffectConnection: junctionConnection('move', 'effect'),
  MoveEffectEdge: basicEdge(),
  
  MoveEnablesMoveConnection: junctionConnection('move', 'move', 'enables'),
  MoveEnablesMoveEdge: basicEdge(),

  MoveGenerationConnection: generationConnection('move'),
  MoveGenerationEdge: basicEdge(),

  MoveIntroductionConnection: introductionConnection('move'),
  MoveIntroductionEdge: basicEdge(),
  
  MoveModifiesStatConnection: junctionConnection('move', 'stat', 'modifies'),
  MoveModifiesStatEdge: modifyStatEdge(),

  MovePokemonConnection: junctionConnection('move', 'pokemon'),
  MovePokemonEdge: learnsetEdge(),
  
  MoveRemovesFieldStateConnection: junctionConnection('move', 'fieldState', 'removes'),
  MoveRemovesFieldStateEdge: basicEdge(),
  
  MoveRequiresItemConnection: junctionConnection('move', 'item', 'requires'),
  MoveRequiresItemEdge: basicEdge(),

  MoveRequiresMoveConnection: junctionConnection('move', 'move', 'requires'),
  MoveRequiresMoveEdge: basicEdge(),

  MoveRequiresPokemonConnection: junctionConnection('move', 'pokemon', 'requires'),
  MoveRequiresPokemonEdge: basicEdge(),

  MoveRequiresTypeConnection: junctionConnection('move', 'type', 'requires'),
  MoveRequiresTypeEdge: basicEdge(),

  MoveResistsStatusConnection: junctionConnection('move', 'status', 'resists'),
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