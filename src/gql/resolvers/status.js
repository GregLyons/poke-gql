/* 
  Resolvers for Status.

  db is a mysql2 database instance. 

  The 'status' table has columns:
    'status_id'
    'status_name'
    'status_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,

  basicEdge,
  causeStatusEdge,
  
  basicJunctionConnection,
  generationConnection,
  introductionConnection,

  parentPK,
} = require('./helpers.js');
const statusPK = parentPK('status');

//#endregion

// Query
/*
    statusByID(id)
    statusByName(name)
    statuses(
      cursor,
      limit,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  statusByName: queryEntitiesByColumn('status', 'name'),

  statuses: queryEntities('status'),
}

//#endregion

// Status
/*
    id
*/
//#region

const Status = {
  causedByAbility: statusPK,

  resistedByAbility: statusPK,

  formattedName: async (parent, args, context, info) => {
    return parent.pstatus_formatted_name;
  },

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,

  causedByItem: statusPK,

  resistedByItem: statusPK,
  
  causedByMove: statusPK,

  resistedByMove: statusPK,

  name: async (parent, args, context, info) => {
    return parent.pstatus_name
  },
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  StatusCausedByAbilityConnection: basicJunctionConnection('status', 'ability', 'causedBy'),
  StatusCausedByAbilityEdge: causeStatusEdge(),
  
  StatusCausedByItemConnection: basicJunctionConnection('status', 'item', 'causedBy'),
  StatusCausedByItemEdge: causeStatusEdge(),
  
  StatusCausedByMoveConnection: basicJunctionConnection('status', 'move', 'causedBy'),
  StatusCausedByMoveEdge: causeStatusEdge(),

  StatusGenerationConnection: generationConnection('status'),
  StatusGenerationEdge: basicEdge(),

  StatusIntroductionConnection: introductionConnection('status'),
  StatusIntroductionEdge: basicEdge(),
  
  StatusResistedByAbilityConnection: basicJunctionConnection('status', 'ability', 'resistedBy'),
  StatusResistedByAbilityEdge: basicEdge(),

  StatusResistedByItemConnection: basicJunctionConnection('status', 'item', 'resistedBy'),
  StatusResistedByItemEdge: basicEdge(),

  StatusResistedByMoveConnection: basicJunctionConnection('status', 'move', 'resistedBy'),
  StatusResistedByMoveEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Status,
  ...ConnectionsAndEdges,
}