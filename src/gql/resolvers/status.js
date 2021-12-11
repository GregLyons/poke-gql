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
  basicEdge,
  causeStatusEdge,
  
  basicJunctionConnection,
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
  statusByName: async (parent, { name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pstatus
        WHERE status_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  statuses: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pstatus
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

// Status
/*
    id
*/
//#region

const Status = {
  abilityCauses: statusPK,

  abilityResists: statusPK,

  formattedName: async (parent, args, context, info) => {
    return parent.pstatus_formatted_name;
  },

  itemCauses: statusPK,

  itemResists: statusPK,
  
  moveCauses: statusPK,

  moveResists: statusPK,

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