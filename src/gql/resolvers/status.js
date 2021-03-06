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
  
  junctionConnection,
  generationConnection,
  introductionConnection,
  topLevelConnection,

  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const statusPK = parentPK('status')
const statusPKDebut = parentPKDebut('status');
const getID = primaryKeyToID('status');

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
  
  statusesByName: queryEntitiesByColumn('status', 'names'),

  statuses: topLevelBulkQuery('status'),
}

//#endregion

// Status
//#region

const Status = {
  id: getID,

  causedByAbility: statusPK,

  causedByFieldState: statusPK,
  
  causedByItem: statusPK,
  
  causedByMove: statusPK,

  description: parent => parent.pstatus_description,
  
  formattedName: parent => parent.pstatus_formatted_name,
  
  generation: statusPK,
  
  introduced: statusPKDebut,

  name: parent => parent.pstatus_name,

  resistedByAbility: statusPK,

  resistedByFieldState: statusPK,
  
  resistedByItem: statusPK,
  
  resistedByMove: statusPK,

  unformattedName: parent => parent.pstatus_unformatted_name,

  volatile: parent => parent.pstatus_volatile,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  StatusConnection: topLevelConnection('status'),
  StatusEdge: basicEdge(),

  StatusCausedByAbilityConnection: junctionConnection('status', 'causedByAbility'),
  StatusCausedByAbilityEdge: causeStatusEdge(),

  StatusCausedByFieldStateConnection: junctionConnection('status', 'causedByFieldState'),
  StatusCausedByFieldStateEdge: causeStatusEdge(),
  
  StatusCausedByItemConnection: junctionConnection('status', 'causedByItem'),
  StatusCausedByItemEdge: causeStatusEdge(),
  
  StatusCausedByMoveConnection: junctionConnection('status', 'causedByMove'),
  StatusCausedByMoveEdge: causeStatusEdge(),

  StatusGenerationConnection: generationConnection('status'),
  StatusGenerationEdge: basicEdge(),

  StatusIntroductionConnection: introductionConnection('status'),
  StatusIntroductionEdge: basicEdge(),
  
  StatusResistedByAbilityConnection: junctionConnection('status', 'resistedByAbility'),
  StatusResistedByAbilityEdge: basicEdge(),

  StatusResistedByFieldStateConnection: junctionConnection('status', 'resistedByFieldState'),
  StatusResistedByFieldStateEdge: basicEdge(),

  StatusResistedByItemConnection: junctionConnection('status', 'resistedByItem'),
  StatusResistedByItemEdge: basicEdge(),

  StatusResistedByMoveConnection: junctionConnection('status', 'resistedByMove'),
  StatusResistedByMoveEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Status,
  ...ConnectionsAndEdges,
}