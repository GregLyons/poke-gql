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

const {entityNameToTableName, introductionConnection, basicEdge} = require('./helpers.js');

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
    abilities
    formattedName
    introduced
    items
    moves
    name
*/
//#region

const Status = {
  formattedName: async (parent, args, context, info) => {
    return parent.pstatus_formatted_name;
  },
  
  name: async (parent, args, context, info) => {
    return parent.pstatus_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
}

//#endregion

module.exports = {
  Query,
  Status,
  ...ConnectionsAndEdges,
}