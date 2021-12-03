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
  basicEdge,
  introductionConnection,
  basicJunctionConnection,
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
  moveByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pmove
        WHERE generation_id = ${generation}
        AND pmove_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  moves: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pmove
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

// Move
/*
    id
    causesStatus
    descriptions
    enables
    enablesMove
    modifiesStat
    pokemon
    requires
*/
//#region

const Move = {
  accuracy: parent => parent.pmove_accuracy,

  contact: parent => parent.pmove_contact,

  effects: movePK,

  formattedName: parent => parent.pmove_formatted_name,
  
  introduced: parent => parent.introduced,
  
  name: parent => parent.pmove_name,

  power: parent => parent.pmove_power,

  pp: parent => parent.pmove_pp,

  priority: parent => parent.pmove_priority,

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
/*

*/
//#region

const ConnectionsAndEdges = {
  // Introduced
  MoveGenerationConnection: introductionConnection('move'),
  MoveGenerationEdge: basicEdge(),


  // Effect
  MoveEffectConnection: basicJunctionConnection('move', 'effect'),
  MoveEffectEdge: basicEdge(),
  

  // Requirements
  MoveRequiresItemConnection: basicJunctionConnection('move', 'item', 'requires'),
  MoveRequiresItemEdge: basicEdge(),

  MoveRequiresMoveConnection: basicJunctionConnection('move', 'move', 'requires'),
  MoveRequiresMoveEdge: basicEdge(),

  MoveRequiresPokemonConnection: basicJunctionConnection('move', 'pokemon', 'requires'),
  MoveRequiresPokemonEdge: basicEdge(),

  MoveRequiresTypeConnection: basicJunctionConnection('move', 'type', 'requires'),
  MoveRequiresTypeEdge: basicEdge(),


  // Status
  MoveResistsStatusConnection: basicJunctionConnection('move', 'status', 'resist'),
  MoveResistsStatusEdge: basicEdge(),

  
  // Type
  // TODO: Change 'pmove_has_ptype' table to remove 'has'
  MoveTypeConnection: basicJunctionConnection('move', 'type', 'has'),
  MoveTypeEdge: basicEdge(),

  
  // Usage method
  MoveUsageMethodConnection: basicJunctionConnection('move', 'usageMethod'),
  MoveUsageMethodEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Move,
  ...ConnectionsAndEdges,
}