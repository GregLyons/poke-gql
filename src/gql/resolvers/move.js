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
  queryEntityByColumn,

  basicEdge,
  causeStatusEdge,
  learnsetEdge,
  modifyStatEdge,
  
  basicJunctionConnection,
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
  moveByName: queryEntityByColumn('move', 'name'),

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
  
  descriptions: movePK,

  effects: movePK,
  
  enables: movePK,
  
  enablesMove: movePK,

  formattedName: parent => parent.pmove_formatted_name,

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,

  modifiesStat: movePK,
  
  name: parent => parent.pmove_name,

  pokemon: movePK,

  power: parent => parent.pmove_power,

  pp: parent => parent.pmove_pp,

  priority: parent => parent.pmove_priority,

  requires: movePK,

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
  MoveCausesStatusConnection: basicJunctionConnection('move', 'status', 'causes'),
  MoveCausesStatusEdge: causeStatusEdge(),
  
  MoveEffectConnection: basicJunctionConnection('move', 'effect'),
  MoveEffectEdge: basicEdge(),
  
  MoveEnablesMoveConnection: basicJunctionConnection('move', 'move', 'enables'),
  MoveEnablesMoveEdge: basicEdge(),

  MoveGenerationConnection: generationConnection('move'),
  MoveGenerationEdge: basicEdge(),

  MoveIntroductionConnection: introductionConnection('move'),
  MoveIntroductionEdge: basicEdge(),
  
  MoveModifiesStatConnection: basicJunctionConnection('move', 'stat', 'modifies'),
  MoveModifiesStatEdge: modifyStatEdge(),

  MovePokemonConnection: basicJunctionConnection('move', 'pokemon'),
  MovePokemonEdge: learnsetEdge(),
  
  MoveRequiresItemConnection: basicJunctionConnection('move', 'item', 'requires'),
  MoveRequiresItemEdge: basicEdge(),

  MoveRequiresMoveConnection: basicJunctionConnection('move', 'move', 'requires'),
  MoveRequiresMoveEdge: basicEdge(),

  MoveRequiresPokemonConnection: basicJunctionConnection('move', 'pokemon', 'requires'),
  MoveRequiresPokemonEdge: basicEdge(),

  MoveRequiresTypeConnection: basicJunctionConnection('move', 'type', 'requires'),
  MoveRequiresTypeEdge: basicEdge(),

  MoveResistsStatusConnection: basicJunctionConnection('move', 'status', 'resists'),
  MoveResistsStatusEdge: basicEdge(),

  MoveTypeConnection: basicJunctionConnection('move', 'type'),
  MoveTypeEdge: basicEdge(),

  MoveUsageMethodConnection: basicJunctionConnection('move', 'usageMethod'),
  MoveUsageMethodEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Move,
  ...ConnectionsAndEdges,
}